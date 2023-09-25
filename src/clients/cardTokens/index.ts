import get from './get';
import create from './create';

import type { CardTokenId } from './get/types';
import type { CardTokenBody } from './create/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
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
	get({ cardTokenId }: CardTokenId, requestOptions?: Options): Promise<CardTokenResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id: cardTokenId, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/cardtoken.ts Usage Example  }.
   */
	create ({ cardTokenBody }: CardTokenBody, requestOptions?: Options): Promise<CardTokenResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body: cardTokenBody, config: this.config });
	}
}
