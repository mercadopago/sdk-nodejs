import fetch, { Response, RequestInit } from 'node-fetch';

const DEFAULT_TIMEOUT = 10000;
const BASE_URL = 'https://api.mercadopago.com/v1';

interface RestClientConfig {
  timeout?: number;
  queryParams?: Record<string, string | number>;
}

export class RestClient {
	static async fetch<T>(
		endpoint: string,
		config?: RestClientConfig & RequestInit
	): Promise<T> {
		const { timeout = DEFAULT_TIMEOUT, queryParams, ...customConfig } = config || {};

		const url = queryParams ? appendQueryParamsToUrl(`${BASE_URL}${endpoint}`, queryParams) : `${BASE_URL}${endpoint}`;

		const responsePromise = fetch(url, {
			...customConfig,
		});

		let timeoutId: NodeJS.Timeout;

		const timeoutPromise = new Promise<Response>((_, reject) => {
			timeoutId = setTimeout(() => {
				reject(new Error(`Request timed out after ${timeout}ms`));
			}, timeout);
		});

		try {
			const response = await Promise.race([responsePromise, timeoutPromise]);

			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			const data = await response.json() as T;
			return data;
		} catch (error) {
			clearTimeout(timeoutId);
			throw error;
		}
	}
}

function appendQueryParamsToUrl(url: string, queryParams: Record<string, string | number>): string {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(queryParams)) {
		searchParams.append(key, value.toString());
	}

	return url.includes('?') ? `${url}&${searchParams}` : `${url}?${searchParams}`;
}
