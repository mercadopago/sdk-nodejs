import fetch, { Response, RequestInit } from 'node-fetch';
import { AppConfig } from '@utils/config';
import { v4 as uuidv4 } from 'uuid';

import type { Options } from '@src/types';

const NO_CONTENT = 204;

interface RestClientConfig extends Options {
	queryParams?: Record<string, string | number>;
	retries?: number;
}

class RestClient {
	private static generateIdempotencyKey(): string {
		return uuidv4();
	}

	static appendQueryParamsToUrl(url: string, queryParams?: Record<string, string | number>): string {
		if (!queryParams) return url;

		const searchParams = new URLSearchParams();

		for (const key in queryParams) {
			if (Object.prototype.hasOwnProperty.call(queryParams,key) && typeof queryParams[key] !== 'undefined') {
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

				const delayMs = AppConfig.BASE_DELAY_MS * 2 ** attempt;
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
			timeout = AppConfig.DEFAULT_TIMEOUT,
			idempotencyKey = RestClient.generateIdempotencyKey(),
			queryParams,
			method = 'GET',
			retries = AppConfig.DEFAULT_RETRIES,
			corporationId,
			integratorId,
			plataformId,
			meliSessionId,
			expandResponseNodes,
			cardValidation,
			testToken,
			...customConfig
		} = config || {};

		const url = RestClient.appendQueryParamsToUrl(`${AppConfig.BASE_URL}${endpoint}`, queryParams);
		customConfig.headers = {
			...customConfig.headers,
			[AppConfig.Headers.CONTENT_TYPE]: 'application/json',
			[AppConfig.Headers.PRODUCT_ID]: AppConfig.PRODUCT_ID,
			[AppConfig.Headers.TRACKING_ID]: AppConfig.getTrackingId(),
			[AppConfig.Headers.USER_AGENT]: AppConfig.getUserAgent(),
			...(corporationId ? { [AppConfig.Headers.CORPORATION_ID]: corporationId } : {}),
			...(integratorId ? { [AppConfig.Headers.INTEGRATOR_ID]: integratorId } : {}),
			...(plataformId ? { [AppConfig.Headers.PLATFORM_ID]: plataformId } : {}),
			...(meliSessionId ? { [AppConfig.Headers.MELI_SESSION_ID]: meliSessionId } : {}),
			...(expandResponseNodes ? { [AppConfig.Headers.EXPAND_RESPONDE_NODES]: expandResponseNodes } : {}),
			...(cardValidation ? { [AppConfig.Headers.CARD_VALIDATION]: cardValidation } : {}),
			...(testToken ? { [AppConfig.Headers.TEST_TOKEN]: testToken.toString() } : {}),
		};

		if (method && method !== 'GET') {
			customConfig.headers = {
				...customConfig.headers,
				[AppConfig.Headers.IDEMPOTENCY_KEY]: idempotencyKey,
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
				if (response.status === NO_CONTENT) {
					return {
						api_response: {
							status: response.status,
							headers: response.headers.raw(),
						}
					} as T;
				}

				const data = await response.json();
				const api_response = {
					status: response.status,
					headers: response.headers.raw(),
				};
				data.api_response = api_response;

				return data as T;
			} else {
				throw await response.json();
			}
		};

		return await RestClient.retryWithExponentialBackoff(fetchFn, retries);
	}
}

export { RestClient };
