export class AppConfig {
	static readonly DEFAULT_TIMEOUT = 10000;
	static readonly DEFAULT_RETRIES = 2;
	static readonly BASE_DELAY_MS = 1000;
	static readonly BASE_URL = 'https://api.mercadopago.com';
	static readonly PRODUCT_ID = 'bc32b6ntrpp001u8nhkg';

	static SDK_VERSION = '2.8.0';

	static readonly Headers = {
		AUTHORIZATION: 'Authorization',
		CONTENT_TYPE: 'Content-Type',
		USER_AGENT: 'User-Agent',
		IDEMPOTENCY_KEY: 'X-Idempotency-Key',
		PRODUCT_ID: 'X-Product-Id',
		TRACKING_ID: 'X-Tracking-Id',
		CORPORATION_ID: 'X-Corporation-Id',
		INTEGRATOR_ID: 'X-Integrator-Id',
		PLATFORM_ID: 'X-Platform-Id',
		MELI_SESSION_ID: 'X-Meli-Session-Id',
		EXPAND_RESPONDE_NODES: 'X-Expand-Responde-Nodes',
		CARD_VALIDATION: 'X-Card-Validation',
		TEST_TOKEN: 'X-Test-Token',
	};

	static getNodeVersion(): string {
		return process.version;
	}

	static getNodeArchitecture(): string {
		return process.arch;
	}

	static getNodePlatform(): string {
		return process.platform;
	}

	static getTrackingId(): string {
		return 'platform:' + this.getNodeVersion().substring(0, this.getNodeVersion().indexOf('.')) + '|' + this.getNodeVersion() + ',type:SDK' + this.SDK_VERSION + ',so;';
	}

	static getUserAgent(): string {
		return 'MercadoPago Node.js SDK v' + this.SDK_VERSION + ' (node ' + this.getNodeVersion() + '-' + this.getNodeArchitecture() + '-' + this.getNodePlatform() + ')';
	}
}
