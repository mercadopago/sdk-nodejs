export declare type Config = {
	accessToken: string;
	options?: Options;
};

export declare type Options = {
	timeout?: number;
	idempotencyKey?: string;
	plataformId?: string;
	integratorId?: string;
	corporationId?: string;
	meliSessionId?: string;
	expandResponseNodes?: string;
	cardValidation?: string;
	testToken?: boolean;
	/** Maximum retry attempts. Defaults to {@link AppConfig.DEFAULT_RETRIES}. */
	maxRetries?: number;
	/** HTTP status codes that trigger a retry. Defaults to [429, 500, 502, 503, 504]. */
	retryOn?: number[];
	/** Initial backoff delay in milliseconds. Defaults to {@link AppConfig.BASE_DELAY_MS}. */
	initialDelay?: number;
	/** Maximum backoff delay in milliseconds. Defaults to 30 000. */
	maxDelay?: number;
	/** Add random jitter to retry delay using `crypto.randomInt`. */
	jitter?: boolean;
	/** Callback invoked before each retry. Receives the attempt number and triggering error. */
	onRetry?: (attempt: number, error: Error) => void;
};

export declare interface SearchOptions {
	limit?: number;
	offset?: number;
	[key: string]: string | number;
}

export declare interface ApiResponse {
	api_response: ResponseFields;
}

export declare type ResponseFields = {
	status: number;
	headers: [string, string[]];
};
