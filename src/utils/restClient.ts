import fetch, { RequestInit } from 'node-fetch';

import type { RestClientConfig } from './types';

const TIMEOUT = 10000;
const BASE_URL = 'https://api.mercadopago.com/v1';

export class RestClient {
	static async fetch<T>(
		endpoint: string,
		config?: RestClientConfig & RequestInit
	): Promise<T> {
		let fetchUrl = BASE_URL + endpoint;
		const { timeout = TIMEOUT, queryParams, ...customConfig } = config || {};

		if (queryParams) {
			const searchParams = new URLSearchParams();

			for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          searchParams.append(key, queryParams[key].toString());
        }
      }

			fetchUrl = fetchUrl.includes('?') ? `${fetchUrl}&${searchParams}` : `${fetchUrl}?${searchParams}`;
		}

		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			controller.abort();
		}, timeout);

		try {
			const response = await fetch(fetchUrl, {
				signal: controller.signal,
				...customConfig,
			});

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
