import { RestClient } from '.';

const fetch = jest.fn();
globalThis.fetch = fetch as unknown as typeof globalThis.fetch;

describe('RestClient', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('Should set 10000 timeout as default', async () => {
		fetch.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200, statusText: 'OK' })
		);

		await RestClient.fetch('/test');

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: expect.any(String),
			signal: expect.any(AbortSignal),
			headers: expect.any(Object)
		});
	});

	test('Should set GET http as default method', async () => {
		fetch.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200, statusText: 'OK' })
		);

		await RestClient.fetch('/test');

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: 'GET',
			signal: expect.any(AbortSignal),
			headers: expect.any(Object)
		});
	});

	test('Should set Idempotency-Key header when method is not GET if it is received', async () => {
		fetch.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200, statusText: 'OK' })
		);

		const idempotencyKey = 'your-idempotency-key';
		await RestClient.fetch('/test', { method: 'POST', idempotencyKey });

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: 'POST',
			headers: {
				'Content-Type': expect.any(String),
				'User-Agent': expect.any(String),
				'X-Idempotency-Key': idempotencyKey,
				'X-Product-Id': expect.any(String),
				'X-Tracking-Id': expect.any(String),
			},
			signal: expect.any(AbortSignal),
		});
	});

	test('Should append query parameters to the URL', async () => {
		fetch.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200, statusText: 'OK' })
		);

		const queryParams = { param1: 'value1', param2: 'value2' };
		await RestClient.fetch('/test', { queryParams });

		expect(fetch).toHaveBeenCalledWith(expect.stringContaining('param1=value1&param2=value2'), {
			method: 'GET',
			signal: expect.any(AbortSignal),
			headers: expect.any(Object)
		});
	});

	test('Should handle network errors and retry according to the retry count', async () => {
		fetch.mockRejectedValueOnce(new Error('Network error 1'));
		fetch.mockRejectedValueOnce(new Error('Network error 2'));
		fetch.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200, statusText: 'OK' })
		);

		const retries = 3;
		const endpoint = '/test-network-retry';
		const response = await RestClient.fetch(endpoint, { retries });

		expect(fetch).toHaveBeenCalledTimes(retries);
		expect(response).toEqual({
			success: true,
			api_response: {
				headers: {
					'content-type': [
						'text/plain;charset=UTF-8',
					],
				},
				status: 200,
			}
		});
	}, 10000);

	test('Should allow custom headers to be set in the request', async () => {
		fetch.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200, statusText: 'OK' })
		);
		const customHeaders = {
			Authorization: 'Bearer Token123',
		};
		const endpoint = '/test-custom-headers';

		await RestClient.fetch(endpoint, {
			headers: customHeaders,
			expandResponseNodes: 'gateway.reference',
			cardValidation: 'card_validation',
			meliSessionId: 'device_id',
			testToken: true,
		});

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: 'GET',
			signal: expect.any(AbortSignal),
			headers: {
				...customHeaders,
				'Content-Type': expect.any(String),
				'User-Agent': expect.any(String),
				'X-Product-Id': expect.any(String),
				'X-Tracking-Id': expect.any(String),
				'X-Meli-Session-Id': 'device_id',
				'X-Expand-Responde-Nodes': 'gateway.reference',
				'X-Card-Validation': 'card_validation',
				'X-Test-Token': 'true',
			},
		});
	});

	test('Should support custom request methods', async () => {
		fetch.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200, statusText: 'OK' })
		);

		const endpoint = '/test-custom-method';
		const customMethod = 'PUT';
		await RestClient.fetch(endpoint, { method: customMethod });

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: customMethod,
			signal: expect.any(AbortSignal),
			headers: expect.any(Object),
		});
	});

	test('Should generate Idempotency-Key header if not provided', async () => {
		fetch.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200, statusText: 'OK' })
		);

		const endpoint = '/test-idempotency';
		await RestClient.fetch(endpoint, { method: 'POST' });

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: 'POST',
			headers: {
				'Content-Type': expect.any(String),
				'User-Agent': expect.any(String),
				'X-Idempotency-Key': expect.any(String),
				'X-Product-Id': expect.any(String),
				'X-Tracking-Id': expect.any(String),
			},
			signal: expect.any(AbortSignal)
		});
	});

	test('Should retry for 5xx errors', async () => {
		const errorResponse = new Response('Internal Server Error', {
			status: 500,
			statusText: 'Internal Server Error',
		});

		const successResponse = new Response(JSON.stringify({ success: true }), {
			status: 200,
			statusText: 'OK',
		});

		fetch
			.mockRejectedValueOnce(errorResponse)
			.mockRejectedValueOnce(errorResponse)
			.mockRejectedValueOnce(errorResponse)
			.mockResolvedValueOnce(successResponse);

		const endpoint = '/test-5xx-error-retry';
		const retries = 5;
		const response = await RestClient.fetch(endpoint, { retries });

		expect(fetch).toHaveBeenCalledTimes(4);
		expect(response).toEqual({
			success: true,
			api_response: {
				headers: {
					'content-type': [
						'text/plain;charset=UTF-8',
					],
				},
				status: 200,
			}
		});
	}, 20000);

	test('Should not retry for 4xx errors', async () => {
		const errorResponse = new Response('Bad Request', {
			status: 400,
			statusText: 'Bad Request',
		});

		fetch
			.mockRejectedValueOnce(errorResponse)
			.mockRejectedValueOnce(errorResponse)
			.mockRejectedValueOnce(errorResponse)
			.mockRejectedValueOnce(errorResponse)
			.mockRejectedValueOnce(errorResponse);

		const endpoint = '/test-4xx-error';
		const retries = 5;
		try {
			await RestClient.fetch(endpoint, { retries });
		} catch (error) {
			expect(fetch).toHaveBeenCalledTimes(1);
			expect(error instanceof Response).toBe(true);
			expect(error.status).toBe(400);
			expect(error.statusText).toBe('Bad Request');
		}
	});

	test('Should return only the api_response when response status is NO_CONTENT', async () => {
		const expectedStatus = 204;
		fetch.mockResolvedValue(
			new Response(null, { status: expectedStatus, headers: { 'Content-Type': 'application/json' } })
		);

		const response = await RestClient.fetch('/test-no-content');

		expect(response).toEqual({
			api_response: {
				status: expectedStatus,
				headers: {
					'content-type': ['application/json'],
				},
			}
		});
	});
});
