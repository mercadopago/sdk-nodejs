/**
 * SDK-wide application configuration and HTTP header constants.
 *
 * Centralises every hard-coded value the SDK needs at runtime:
 * base URL, timeouts, retry policy, product/tracking identifiers,
 * and the standard header names required by the MercadoPago API.
 *
 * @module utils/config
 */

/**
 * Static configuration class consumed by {@link RestClient}.
 *
 * All members are static because the SDK is stateless — there is no
 * per-instance runtime that needs its own copy of these values.
 */
export class AppConfig {
	/** Default HTTP timeout in milliseconds applied when no override is provided. */
	static readonly DEFAULT_TIMEOUT = 10000;

	/** Default number of retry attempts for server errors (HTTP 5xx). */
	static readonly DEFAULT_RETRIES = 2;

	/** Base delay in milliseconds for exponential back-off between retries. */
	static readonly BASE_DELAY_MS = 1000;

	/** Root URL for all MercadoPago REST API calls. */
	static readonly BASE_URL = 'https://api.mercadopago.com';

	/** Internal MercadoPago product identifier used for telemetry. */
	static readonly PRODUCT_ID = 'bc32b6ntrpp001u8nhkg';

	/**
	 * Current SDK version string.
	 *
	 * Embedded into the `User-Agent` and `X-Tracking-Id` headers so the
	 * API can attribute traffic to a specific SDK release.
	 */
	static SDK_VERSION = '2.12.1';

	/**
	 * Canonical HTTP header names used in every request to the MercadoPago API.
	 *
	 * Keeping them in one place prevents typos and makes it easy to audit
	 * which custom headers the SDK sends.
	 */
	static readonly Headers = {
		AUTHORIZATION: 'Authorization',
		CONTENT_TYPE: 'Content-Type',
		USER_AGENT: 'User-Agent',
		/** Ensures write operations are executed at most once. */
		IDEMPOTENCY_KEY: 'X-Idempotency-Key',
		/** Internal MercadoPago product identifier for telemetry. */
		PRODUCT_ID: 'X-Product-Id',
		/** SDK + Node.js version string for server-side analytics. */
		TRACKING_ID: 'X-Tracking-Id',
		/** Corporation identifier for multi-account setups. */
		CORPORATION_ID: 'X-Corporation-Id',
		/** Certified integrator identifier. */
		INTEGRATOR_ID: 'X-Integrator-Id',
		/** Platform identifier assigned by MercadoPago. */
		PLATFORM_ID: 'X-Platform-Id',
		/** MELI session identifier for session-level tracking. */
		MELI_SESSION_ID: 'X-Meli-Session-Id',
		/** Comma-separated response nodes to expand. */
		EXPAND_RESPONDE_NODES: 'X-Expand-Responde-Nodes',
		/** Card validation mode header. */
		CARD_VALIDATION: 'X-Card-Validation',
		/** Signals the API to treat the request as a test transaction. */
		TEST_TOKEN: 'X-Test-Token',
	};

	/** Returns the running Node.js version (e.g. `v18.17.0`). */
	static getNodeVersion(): string {
		return process.version;
	}

	/** Returns the CPU architecture (e.g. `x64`, `arm64`). */
	static getNodeArchitecture(): string {
		return process.arch;
	}

	/** Returns the operating system platform (e.g. `darwin`, `linux`). */
	static getNodePlatform(): string {
		return process.platform;
	}

	/**
	 * Builds the `X-Tracking-Id` header value.
	 *
	 * Encodes the Node.js major version, full version, and SDK version
	 * so the API team can correlate requests with specific environments.
	 */
	static getTrackingId(): string {
		return 'platform:' + this.getNodeVersion().substring(0, this.getNodeVersion().indexOf('.')) + '|' + this.getNodeVersion() + ',type:SDK' + this.SDK_VERSION + ',so;';
	}

	/**
	 * Builds the `User-Agent` header value.
	 *
	 * Follows the pattern:
	 * `MercadoPago Node.js SDK v{SDK_VERSION} (node {version}-{arch}-{platform})`
	 */
	static getUserAgent(): string {
		return 'MercadoPago Node.js SDK v' + this.SDK_VERSION + ' (node ' + this.getNodeVersion() + '-' + this.getNodeArchitecture() + '-' + this.getNodePlatform() + ')';
	}
}
