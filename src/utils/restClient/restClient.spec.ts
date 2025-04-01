import { RestClient } from '.';
import fetch from 'node-fetch';

jest.mock('node-fetch', () => jest.fn());
const { Response } = jest.requireActual('node-fetch');

describe('RestClient', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('Should set 10000 timeout as default', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
		);

		await RestClient.fetch('/test');

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: expect.any(String),
			timeout: 10000,
			headers: expect.any(Object)
		});
	});

	test('Should set GET http as default method', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
		);

		await RestClient.fetch('/test');

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: 'GET',
			timeout: expect.any(Number),
			headers: expect.any(Object)
		});
	});

	test('Should set Idempotency-Key header when method is not GET if it is received', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
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
			timeout: expect.any(Number),
		});
	});

	test('Should append query parameters to the URL', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
		);

		const queryParams = { param1: 'value1', param2: 'value2' };
		await RestClient.fetch('/test', { queryParams });

		expect(fetch).toHaveBeenCalledWith(expect.stringContaining('param1=value1&param2=value2'), {
			method: 'GET',
			timeout: expect.any(Number),
			headers: expect.any(Object)
		});
	});

	test('Should handle network errors and retry according to the retry count', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error 1'));
		(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error 2'));
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
		);

		const retries = 3;
		const endpoint = '/test-network-retry';
		const response = await RestClient.fetch(endpoint, { retries });

		expect(fetch).toHaveBeenCalledTimes(retries);
		expect(response).toEqual({
			success: true,
			api_response: {
				headers: {
					'Content-Type': [
						'text/plain;charset=UTF-8',
					],
				},
				status: 200,
			}
		});
	}, 10000);

	test('Should allow custom headers to be set in the request', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
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
			timeout: expect.any(Number),
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
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
		);

		const endpoint = '/test-custom-method';
		const customMethod = 'PUT';
		await RestClient.fetch(endpoint, { method: customMethod });

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: customMethod,
			timeout: expect.any(Number),
			headers: expect.any(Object),
		});
	});

	test('Should generate Idempotency-Key header if not provided', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
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
			timeout: expect.any(Number)
		});
	});

	test('Should retry for 5xx errors', async () => {
		const errorResponse = new Response('Internal Server Error', {
			url: 'url',
			status: 500,
			statusText: 'Internal Server Error',
		});

		const successResponse = new Response(JSON.stringify({ success: true }), {
			url: 'url',
			status: 200,
			statusText: 'OK',
		});

		(fetch as jest.MockedFunction<typeof fetch>)
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
					'Content-Type': [
						'text/plain;charset=UTF-8',
					],
				},
				status: 200,
			}
		});
	}, 20000);

	test('Should not retry for 4xx errors', async () => {
		const errorResponse = new Response('Bad Request', {
			url: 'url',
			status: 400,
			statusText: 'Bad Request',
		});

		(fetch as jest.MockedFunction<typeof fetch>)
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
		const expectedHeaders = {
			'Content-Type': ['application/json'],
		};
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(null, { url: 'url', status: expectedStatus, headers: expectedHeaders })
		);

		const response = await RestClient.fetch('/test-no-content');

		expect(response).toEqual({
			api_response: {
				status: expectedStatus,
				headers: expectedHeaders,
			}
		});
	});
});
