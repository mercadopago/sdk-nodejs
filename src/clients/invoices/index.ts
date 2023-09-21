import get from './get';
import search from './search';

import type { InvoicesResponse } from './commonTypes';
import type { InvoicesGetRequest } from './get/types';
import type { InvoicesSearchRequest, InvoicesSearchResponse } from './search/types';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export class Invoices {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/invoices/get/get.ts Usage Example  }.
   */
	get({ id, requestOptions }: InvoicesGetRequest): Promise<InvoicesResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/invoices/search/search.ts Usage Example  }.
   */
	search({ filters, requestOptions }: InvoicesSearchRequest): Promise<InvoicesSearchResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ filters, config: this.config });
	}
}
