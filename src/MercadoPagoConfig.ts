import type { Config, Options } from './types';

/**
 * Mercado Pago SDK Node.
 *
 * @see {@link https://github.com/mercadopago/sdk-nodejs Documentation }.
 */
export class MercadoPagoConfig {
	accessToken: string;
	options?: Options;

	constructor(config: Config) {
		this.accessToken = config.accessToken;
		this.options = config.options;
	}
}
