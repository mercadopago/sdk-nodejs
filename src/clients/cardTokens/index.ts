import get from './get';
import create from './create';

import type { CardTokenGetData } from './get/types';
import type { CardTokenCreateData } from './create/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CardTokenResponse } from './commonTypes';

/**
 * Mercado Pago CardTokens.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class CardToken {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/cardtoken/get.ts Usage Example  }.
   */
	get({ cardTokenId, requestOptions }: CardTokenGetData): Promise<CardTokenResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id: cardTokenId, config: this.config });
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/cardtoken/create.ts Usage Example  }.
   */
	create ({ body, requestOptions }: CardTokenCreateData): Promise<CardTokenResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}
}
