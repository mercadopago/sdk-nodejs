import fetch, { Response, RequestInit } from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TIMEOUT = 10000;
const DEFAULT_RETRIES = 2;
const BASE_DELAY_MS = 1000;
const BASE_URL = 'https://api.mercadopago.com';

interface RestClientConfig {
  timeout?: number;
  queryParams?: Record<string, string | number>;
  retries?: number;
  idempotencyKey?: string;
}

class RestClient {
	private static generateIdempotencyKey(): string {
		return uuidv4();
	}

	static appendQueryParamsToUrl(url: string, queryParams?: Record<string, string | number>): string {
		if (!queryParams) return url;

		const searchParams = new URLSearchParams();

		for (const key in queryParams) {
			if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
				searchParams.append(key, queryParams[key].toString());
			}
		}

		return url.includes('?') ? `${url}&${searchParams.toString()}` : `${url}?${searchParams.toString()}`;
	}

	private static async retryWithExponentialBackoff<T>(
		fn: () => Promise<T>,
		retries: number,
	): Promise<T> {
		let attempt = 1;

		const execute = async () => {
			try {
				return await fn();
			} catch (error) {
				if (attempt >= retries || (error.status < 500)) {
					throw error;
				}

				const delayMs = BASE_DELAY_MS * 2 ** attempt;
				await new Promise((resolve) => setTimeout(resolve, delayMs));

				attempt++;
				return execute();
			}
		};

		return execute();
	}

	static async fetch<T>(
		endpoint: string,
		config?: RestClientConfig & RequestInit
	): Promise<T> {
		const {
			timeout = DEFAULT_TIMEOUT,
			idempotencyKey = RestClient.generateIdempotencyKey(),
			queryParams,
			method = 'GET',
			retries = DEFAULT_RETRIES,
			...customConfig
		} = config || {};

		const url = RestClient.appendQueryParamsToUrl(`${BASE_URL}${endpoint}`, queryParams);
		if (method && method !== 'GET') {
			customConfig.headers = {
				...(customConfig.headers || {}),
				'Idempotency-Key': idempotencyKey,
			};
		}

		let response: Response;

		const fetchFn = async () => {
			response = await fetch(url, {
				...customConfig,
				method,
				timeout,
			});

			if (response.ok) {
				const data = await response.json();
				const api_response = {
					status: response.status,
					headers: response.headers.raw(),
				};
				data.api_response = api_response;
				return data as T;
			} else {
				throw response;
			}
		};

		return await RestClient.retryWithExponentialBackoff(fetchFn, retries);
	}
}

export { RestClient };
