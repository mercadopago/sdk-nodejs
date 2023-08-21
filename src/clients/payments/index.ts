import search from './search';

import type { PaymentsSearch, PaymentsSearchOptions } from './search/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export class Payments {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	search(filters?: PaymentsSearchOptions): Promise<PaymentsSearch> {
		return search({filters, config: this.config});
	}
}
