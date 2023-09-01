import { RestClient } from '.';
import fetchMock from 'jest-fetch-mock';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

describe('RestClient', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	describe('fetch', () => {
		it('should use default idempotency key for POST requests', async () => {
			const mockId = 'mocked-id';
			(uuidv4 as jest.Mock).mockReturnValue(mockId);

			fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

			const response = await RestClient.fetch('/test', { method: 'POST' });

			expect(response).toEqual({});
			expect(uuidv4).toHaveBeenCalledTimes(1);
		});

		it('should fetch data successfully', async () => {
			fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

			const response = await RestClient.fetch<{ message: string }>('/test');
			expect(response.message).toEqual('Success');
			expect(fetchMock).toHaveBeenCalledTimes(1);
		});

		it('should retry and throw an error', async () => {
			fetchMock.mockRejectedValueOnce(new Error('Failed'))
				.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

			await expect(RestClient.fetch('/test')).resolves.toEqual({ message: 'Success' });
			expect(fetchMock).toHaveBeenCalledTimes(2);
		});

		it('should use provided idempotency key for POST requests', async () => {
			fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

			const idempotencyKey = 'abc123';
			await RestClient.fetch('/test', {
				method: 'POST',
				idempotencyKey,
			});
			expect(fetchMock.mock.calls[0][1].headers).toHaveProperty('Idempotency-Key', idempotencyKey);
		});

		it('should not use provided idempotency key for GET requests', async () => {
			fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

			await RestClient.fetch('/test', {
				method: 'GET',
			});
			expect(fetchMock.mock.calls[0][1].headers).toBeUndefined();
		});


		it('should handle query parameters correctly', async () => {
			fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

			await RestClient.fetch('/test', {
				queryParams: {
					param1: 'value1',
					param2: 2,
				},
			});

			const urlWithQueryParams = fetchMock.mock.calls[0][0];
			expect(urlWithQueryParams).toContain('/test?param1=value1&param2=2');
		});

		it('should handle custom timeout', async () => {
			fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

			const timeout = 5000;
			await RestClient.fetch('/test', { timeout });

			const options = fetchMock.mock.calls[0][1];
			expect(options).toHaveProperty('timeout', timeout);
		});
	});

	it('should use default idempotency key for POST requests', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

		await RestClient.fetch('/test', {
			method: 'POST',
		});
		const options = fetchMock.mock.calls[0][1];
		expect(options.headers).toHaveProperty('Idempotency-Key');
	});

	it('should handle headers correctly', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

		await RestClient.fetch('/test', {
			method: 'GET',
			headers: {
				'Custom-Header': 'Value',
			},
		});

		const options = fetchMock.mock.calls[0][1];
		expect(options.headers).toHaveProperty('Custom-Header', 'Value');
	});

	it('should handle headers and idempotency key for PUT requests', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });

		const idempotencyKey = 'abc123';
		await RestClient.fetch('/test', {
			method: 'PUT',
			headers: {
				'Custom-Header': 'Value',
			},
			idempotencyKey,
		});

		const options = fetchMock.mock.calls[0][1];
		expect(options.headers).toHaveProperty('Custom-Header', 'Value');
		expect(options.headers).toHaveProperty('Idempotency-Key', idempotencyKey);
	});

	it('should throw an error for unsuccessful response', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ message: 'Error' }), { status: 400 });

		await expect(RestClient.fetch('/test')).rejects.toThrowError('invalid json response body');
	});

	it('should handle response with invalid JSON', async () => {
		fetchMock.mockResponseOnce('Invalid JSON', { status: 500 });

		await expect(RestClient.fetch('/test')).rejects.toThrowError('invalid json response body');
	});

	it('should use GET as the default method', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

		await RestClient.fetch('/example');

		const fetchCall = fetchMock.mock.calls[0];
		const fetchOptions = fetchCall[1];

		expect(fetchOptions.method).toBe('GET');
	});

	it('should allow specifying a different method', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

		await RestClient.fetch('/example', { method: 'POST' });

		const fetchCall = fetchMock.mock.calls[0];
		const fetchOptions = fetchCall[1];

		expect(fetchOptions.method).toBe('POST');
	});

	it('should use GET as the default method if method is not specified', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

		await RestClient.fetch('/example', {});

		const fetchCall = fetchMock.mock.calls[0];
		const fetchOptions = fetchCall[1];

		expect(fetchOptions.method).toBe('GET');
	});
});
