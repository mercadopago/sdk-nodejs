import get from './get';

import type { UserResponse } from './get/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Mercado Pago User.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class User {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago User.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/src/user/get/get.ts Usage Example  }.
   */
	get(requestOptions?: Options): Promise<UserResponse[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ config: this.config });
	}
}
