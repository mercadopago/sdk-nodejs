import search from './search';

import type { PaymentsSearch, PaymentsSearchOptions } from './search/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Mercado Pago Payment.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference Documentation }.
 */
export class Payments {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/payments/search.ts Usage Example  }.
   */
	search(filters?: PaymentsSearchOptions): Promise<PaymentsSearch> {
		return search({ filters, config: this.config });
	}
}
