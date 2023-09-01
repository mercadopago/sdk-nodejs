import fetch, { Response, RequestInit } from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TIMEOUT = 10000;
const DEFAULT_MAX_RETRIES = 2;
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

	private static appendQueryParamsToUrl(url: string, queryParams?: Record<string, string | number>): string {
		if (!queryParams) return url;

		const searchParams = new URLSearchParams();

		for (const key in queryParams) {
			if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
				searchParams.append(key, queryParams[key].toString());
			}
		}

		return url.includes('?') ? `${url}&${searchParams.toString()}` : `${url}?${searchParams.toString()}`;
	}

	static async fetch<T>(
		endpoint: string,
		config?: RestClientConfig & RequestInit
	): Promise<T> {
		const {
			timeout = DEFAULT_TIMEOUT,
			retries: maxRetries = DEFAULT_MAX_RETRIES,
			idempotencyKey,
			queryParams,
			method = 'GET',
			...customConfig
		} = config || {};

		const url = `${BASE_URL}${endpoint}${queryParams ? RestClient.appendQueryParamsToUrl('', queryParams) : ''}`;

		if (method && method !== 'GET') {
			customConfig.headers = {
				...(customConfig.headers || {}),
				'Idempotency-Key': idempotencyKey || RestClient.generateIdempotencyKey(),
			};
		}

		let retries = 0;
		let response: Response;

		while (retries <= maxRetries) {
			try {
				response = await fetch(url, {
					...customConfig,
					method,
					timeout,
				});

				if (response.ok) {
					const data = await response.json() as T;
					return data;
				}
			} catch (error) {
				retries++;
				if (retries > maxRetries -1) {
					throw error;
				}
			}
		}

		throw new Error(`Request failed with status ${response.status}`);
	}
}

export { RestClient };
