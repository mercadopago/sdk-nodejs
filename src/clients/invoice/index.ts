import get from './get';
import search from './search';

import type { InvoiceResponse } from './commonTypes';
import type { InvoiceGetData } from './get/types';
import type { InvoiceSearchData, InvoiceSearchResponse } from './search/types';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export class Invoice {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/invoice/get.ts Usage Example  }.
   */
	get({ id, requestOptions }: InvoiceGetData): Promise<InvoiceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/invoice/search.ts Usage Example  }.
   */
	search(ivoicesSearchOptions: InvoiceSearchData = {}): Promise<InvoiceSearchResponse> {
		const { options, requestOptions } = ivoicesSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}
}
