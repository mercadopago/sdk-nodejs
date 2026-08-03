import { randomInt } from 'crypto';
import fetch, { Response, RequestInit } from 'node-fetch';
import { AppConfig } from '@utils/config';
import { buildError, MPConnectionError } from '@utils/errors';
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

	private static computeDelay(
		attempt: number,
		initialDelay: number,
		maxDelay: number,
		useJitter: boolean,
	): number {
		const exponential = Math.min(initialDelay * Math.pow(2, attempt), maxDelay);
		if (!useJitter || exponential <= 0) return exponential;
		// Use crypto.randomInt — NEVER Math.random()
		return randomInt(0, exponential + 1);
	}

	private static parseRetryAfterMs(response: Response): number | null {
		const header = response.headers.get('Retry-After');
		if (!header) return null;
		const seconds = parseInt(header, 10);
		return isNaN(seconds) ? null : seconds * 1000;
	}

	private static async retryWithExponentialBackoff(
		fn: () => Promise<Response>,
		retries: number,
		retryOn: number[],
		initialDelay: number,
		maxDelay: number,
		useJitter: boolean,
		onRetry?: (attempt: number, error: Error) => void,
	): Promise<Response> {
		let lastError: Error = new Error('Retry loop exited without result');

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const response = await fn();

				if (response.ok) return response;
				if (response.status === 204) return response;

				// Non-ok response — should we retry?
				if (attempt < retries && retryOn.includes(response.status)) {
					const retryAfterMs = response.status === 429
						? RestClient.parseRetryAfterMs(response)
						: null;
					const delay = retryAfterMs !== null
						? Math.min(retryAfterMs, maxDelay)
						: RestClient.computeDelay(attempt, initialDelay, maxDelay, useJitter);

					// Build a typed error for the onRetry callback
					const errorBody = await response.json().catch(() => ({}));
					const err = buildError(response.status, errorBody as Record<string, unknown>);
					lastError = err;
					onRetry?.(attempt + 1, err);
					await new Promise((resolve) => setTimeout(resolve, delay));
					continue;
				}

				return response;
			} catch (networkError) {
				if (attempt >= retries) {
					throw new MPConnectionError(networkError);
				}
				const err = new MPConnectionError(networkError);
				lastError = err;
				onRetry?.(attempt + 1, err);
				const delay = RestClient.computeDelay(attempt, initialDelay, maxDelay, useJitter);
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		}

		throw lastError;
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
			maxRetries,
			retryOn = AppConfig.DEFAULT_RETRY_ON,
			initialDelay = AppConfig.BASE_DELAY_MS,
			maxDelay = AppConfig.DEFAULT_MAX_DELAY_MS,
			jitter = false,
			onRetry,
			corporationId,
			integratorId,
			plataformId,
			meliSessionId,
			expandResponseNodes,
			cardValidation,
			testToken,
			...customConfig
		} = config || {};

		// maxRetries (new field) takes precedence over retries (legacy field)
		const effectiveRetries = maxRetries !== undefined ? maxRetries : retries;

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


		const fetchFn = async (): Promise<Response> => {
			return fetch(url, {
				...customConfig,
				method,
				timeout,
			});
		};

		const response = await RestClient.retryWithExponentialBackoff(
			fetchFn,
			effectiveRetries,
			retryOn,
			initialDelay,
			maxDelay,
			jitter,
			onRetry,
		);

		if (response.status === NO_CONTENT) {
			return {
				api_response: {
					status: response.status,
					headers: response.headers.raw(),
				}
			} as T;
		}

		const body = await response.json().catch(() => ({})) as Record<string, unknown>;

		if (!response.ok) {
			const retryAfter = response.status === 429
				? RestClient.parseRetryAfterMs(response)
				: null;
			const seconds = retryAfter !== null ? retryAfter / 1000 : null;
			throw buildError(response.status, body, seconds);
		}

		const api_response = {
			status: response.status,
			headers: response.headers.raw(),
		};
		(body as Record<string, unknown>).api_response = api_response;
		return body as T;
	}
}

export { RestClient };
