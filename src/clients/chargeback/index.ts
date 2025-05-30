import get from './get';
import search from './search';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ChargebackGetData } from './get/types';
import type { ChargebackSearchData } from './search/types';
import type { ChargebackResponse } from './commonTypes';
import type { ChargebackSearch } from './search/types';

/**
 * Mercado Pago Chargeback.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/chargebacks/_chargebacks_id/get Documentation }.
 */
export class Chargeback {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Get chargeback by ID.
	 *
	 * @param { ChargebackGetData } data - Data to get a chargeback.
	 * @returns { Promise<ChargebackResponse> } Promise with chargeback information.
	 */
	get(data: ChargebackGetData): Promise<ChargebackResponse> {
		return get({ ...data, config: this.config });
	}

	/**
	 * Search for chargebacks.
	 *
	 * @param { ChargebackSearchData } data - Data to search chargebacks.
	 * @returns { Promise<ChargebackSearch> } Promise with search results.
	 */
	search(data: ChargebackSearchData): Promise<ChargebackSearch> {
		return search({ ...data, config: this.config });
	}
} 