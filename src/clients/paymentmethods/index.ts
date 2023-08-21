import get from './get';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentMethodResponse } from './get/types';

export class PaymentMethod {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	get(): Promise<PaymentMethodResponse[]> {
		return get({ config: this.config });
	}
}
