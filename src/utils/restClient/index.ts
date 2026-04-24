/**
 * Low-level HTTP client used by every API operation in the SDK.
 *
 * Wraps `node-fetch` and adds:
 * - Automatic header injection (auth, tracking, idempotency).
 * - Query-string serialisation.
 * - Exponential back-off retry for transient server errors (HTTP 5xx).
 * - Standard response envelope (`api_response`) appended to every result.
 *
 * No API client calls `fetch` directly — they all delegate to
 * {@link RestClient.fetch}.
 *
 * @module utils/restClient
 */

import fetch, { Response, RequestInit } from 'node-fetch';
import { AppConfig } from '@utils/config';
import { v4 as uuidv4 } from 'uuid';

import type { Options } from '@src/types';

/** HTTP 204 — the server processed the request but returns no body. */
const NO_CONTENT = 204;

/**
 * Merged configuration for a single REST call.
 *
 * Combines the global SDK {@link Options} with per-request overrides
 * such as query parameters and retry count.
 */
interface RestClientConfig extends Options {
	/** Key-value pairs appended to the URL as query-string parameters. */
	queryParams?: Record<string, string | number>;
	/** Number of retry attempts for HTTP 5xx errors (default: {@link AppConfig.DEFAULT_RETRIES}). */
	retries?: number;
}

/**
 * Static HTTP client — every SDK operation delegates to {@link RestClient.fetch}.
 *
 * Responsibilities:
 * 1. Build the full URL (base + endpoint + query string).
 * 2. Inject mandatory and optional HTTP headers.
 * 3. Add an idempotency key for non-GET methods.
 * 4. Execute the request with retry + exponential back-off.
 * 5. Normalise the response into `{ ...payload, api_response }`.
 */
class RestClient {
	/** Generates a UUID v4 idempotency key for write operations. */
	private static generateIdempotencyKey(): string {
		return uuidv4();
	}

	/**
	 * Appends query-string parameters to a URL.
	 *
	 * Skips `undefined` values so callers don't need to pre-filter.
	 * Handles URLs that already contain a `?` by appending with `&`.
	 *
	 * @param url - Base URL (may already include a query string).
	 * @param queryParams - Key-value pairs to append.
	 * @returns The URL with the encoded query string.
	 */
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

	/**
	 * Executes a function with exponential back-off on failure.
	 *
	 * Retries only when the error has an HTTP status >= 500 (server error).
	 * Client errors (4xx) are thrown immediately.
	 * The delay doubles on each attempt: `BASE_DELAY_MS * 2^attempt`.
	 *
	 * @typeParam T - Return type of the wrapped function.
	 * @param fn - The async operation to execute and potentially retry.
	 * @param retries - Maximum number of attempts before giving up.
	 */
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

	/**
	 * Performs an HTTP request against the MercadoPago API.
	 *
	 * This is the single exit point for all network I/O in the SDK.
	 * It merges SDK defaults with caller-provided overrides, injects
	 * required headers, and normalises the JSON response.
	 *
	 * - **204 No Content** → returns `{ api_response }` with no body.
	 * - **2xx with body** → returns the parsed JSON with `api_response` appended.
	 * - **Non-2xx** → throws the parsed error body.
	 *
	 * @typeParam T - Expected shape of the parsed JSON response.
	 * @param endpoint - API path relative to the base URL (e.g. `/v1/payments`).
	 * @param config - Merged request settings (headers, body, method, options, etc.).
	 * @returns Parsed API response with an `api_response` envelope.
	 */
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
			platformId,
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
			...(platformId ? { [AppConfig.Headers.PLATFORM_ID]: platformId } : {}),
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