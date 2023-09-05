import { RestClient } from '.';
import fetch from 'node-fetch';

jest.mock('node-fetch', () => jest.fn());
const { Response } = jest.requireActual('node-fetch');

describe('RestClient', () => {
	test('Should set 10000 timeout as default', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
		);

		await RestClient.fetch('/test');

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: expect.any(String),
			timeout: 10000,
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
				'Idempotency-Key': idempotencyKey,
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
		expect(response).toEqual({ success: true });
	});

	test('Should throw an error if the response status code is not in the 2xx range', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ error: 'Not Found' }), { url: 'url', status: 404, statusText: 'Not Found' })
		);

		const endpoint = '/test-not-found';
		try {
			await RestClient.fetch(endpoint);
		} catch (error) {
			expect(error.status).toBe(404);
			expect(error.statusText).toBe('Not Found');
		}
	});

	test('Should allow custom headers to be set in the request', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { url: 'url', status: 200, statusText: 'OK' })
		);

		const customHeaders = {
			Authorization: 'Bearer Token123',
		};
		const endpoint = '/test-custom-headers';
		await RestClient.fetch(endpoint, { headers: customHeaders });

		expect(fetch).toHaveBeenCalledWith(expect.any(String), {
			method: 'GET',
			timeout: expect.any(Number),
			headers: customHeaders,
		});
	});

	test('Should throw an error if the response status code is not 200 OK when retries are exhausted', async () => {
		(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
			new Response(JSON.stringify({ error: 'Internal Server Error' }), { url: 'url', status: 500, statusText: 'Internal Server Error' })
		);

		const endpoint = '/test-retry-failure';
		const retries = 2;
		try {
			await RestClient.fetch(endpoint, { retries });
		} catch (error) {
			expect(error.status).toBe(500);
			expect(error.statusText).toBe('Internal Server Error');
			expect(fetch).toHaveBeenCalledTimes(retries);
		}
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
				'Idempotency-Key': expect.any(String),
			},
			timeout: expect.any(Number),
		});
	});
});
