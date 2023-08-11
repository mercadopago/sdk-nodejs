import type { Config, Options } from './types';

export class MercadoPagoConfig {
	accessToken: string;
	options: Options;

	constructor(config: Config) {
		this.accessToken = config.accessToken;
		this.options = config.options;
	}
}
