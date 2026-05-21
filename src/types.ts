/**
 * Global SDK type definitions.
 *
 * Contains the shared types used across the entire SDK: configuration,
 * per-request options, search pagination, and the standard API response
 * envelope that every endpoint appends to its result.
 *
 * @module types
 */

/**
 * Constructor payload for {@link MercadoPagoConfig}.
 *
 * At minimum an `accessToken` is required; all other settings are optional.
 */
export declare type Config = {
	/** OAuth access token (e.g. `APP_USR-...` or `TEST-...`). */
	accessToken: string;
	/** Optional global request-level settings. */
	options?: Options;
};

/**
 * Request-level options that can be set globally on the config
 * or overridden per-call via `requestOptions`.
 *
 * These are forwarded as HTTP headers or fetch settings by the
 * internal {@link RestClient}.
 */
export declare type Options = {
	/** HTTP request timeout in milliseconds (default: 10 000). */
	timeout?: number;
	/** Unique key to guarantee idempotent write operations. Auto-generated when omitted. */
	idempotencyKey?: string;
	/** MercadoPago-assigned platform identifier (sent as `X-Platform-Id`). */
	platformId?: string;
	/** Certified integrator identifier (sent as `X-Integrator-Id`). */
	integratorId?: string;
	/** Corporation identifier for multi-account setups (sent as `X-Corporation-Id`). */
	corporationId?: string;
	/** MELI session identifier for session tracking (sent as `X-Meli-Session-Id`). */
	meliSessionId?: string;
	/** Comma-separated node names to expand in the response payload. */
	expandResponseNodes?: string;
	/** Card validation mode header value. */
	cardValidation?: string;
	/** When `true`, signals the API to use a test token (sent as `X-Test-Token`). */
	testToken?: boolean;
};

/**
 * Common query-string parameters for paginated search endpoints.
 *
 * Specific clients extend this interface with domain-specific filters
 * (e.g. `sort`, `criteria`, `begin_date`).
 */
export declare interface SearchOptions {
	/** Maximum number of results per page. */
	limit?: number;
	/** Zero-based offset for pagination. */
	offset?: number;
	/** Additional dynamic filter key-value pairs. */
	[key: string]: string | number;
}

/**
 * Standard envelope appended to every successful API response.
 *
 * All domain-specific response types extend this interface so callers
 * can always inspect the raw HTTP status and headers.
 */
export declare interface ApiResponse {
	/** Raw HTTP status code and response headers. */
	api_response: ResponseFields;
}

/**
 * Raw HTTP metadata returned by the MercadoPago API.
 */
export declare type ResponseFields = {
	/** HTTP status code (e.g. 200, 201, 204). */
	status: number;
	/** Response headers as key → values pairs. */
	headers: [string, string[]];
};
