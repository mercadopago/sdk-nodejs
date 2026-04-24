/**
 * SDK configuration module.
 *
 * Holds the {@link MercadoPagoConfig} class, which every API client
 * requires as its constructor argument. It stores the OAuth access token
 * and optional request-level settings (timeout, idempotency, platform IDs, etc.).
 *
 * @module mercadoPagoConfig
 */

import type { Config, Options } from './types';

/**
 * Central configuration object for the MercadoPago Node.js SDK.
 *
 * Every API client (Payment, Order, Customer, etc.) receives an instance
 * of this class and reads the access token and request options from it.
 *
 * ```ts
 * const config = new MercadoPagoConfig({
 *   accessToken: 'APP_USR-...',
 *   options: { timeout: 5000, idempotencyKey: 'unique-key' },
 * });
 * const payment = new Payment(config);
 * ```
 *
 * @see {@link https://github.com/mercadopago/sdk-nodejs Documentation}
 */
export class MercadoPagoConfig {
	/** OAuth access token used in the `Authorization` header of every API request. */
	accessToken: string;

	/**
	 * Optional request-level settings that apply globally to all API calls
	 * made through clients sharing this config instance.
	 *
	 * Individual client methods can override these via `requestOptions`.
	 */
	options?: Options;

	/**
	 * Creates a new SDK configuration.
	 *
	 * @param config - Access token and optional global request settings.
	 */
	constructor(config: Config) {
		this.accessToken = config.accessToken;
		this.options = config.options;
	}
}
