import get from './get';
import search from './search';

import type { InvoicesResponse } from './commonTypes';
import type { InvoicesGetData } from './get/types';
import type { InvoicesSearchData, InvoicesSearchResponse } from './search/types';

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
	get({ id, requestOptions }: InvoicesGetData): Promise<InvoicesResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/invoice/search.ts Usage Example  }.
   */
	search(ivoicesSearchOptions: InvoicesSearchData = {}): Promise<InvoicesSearchResponse> {
		const { options, requestOptions } = ivoicesSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}
}
