/**
 * Chargeback client for the MercadoPago API.
 *
 * Provides read-only access to chargeback dispute records initiated by
 * cardholders through their issuing bank.
 *
 * @module chargeback
 */
import get from './get';
import search from './search';

import type { ChargebackResponse } from './commonTypes';
import type { ChargebackGetData } from './get/types';
import type { ChargebackSearchData, ChargebackSearchResponse } from './search/types';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export class Chargeback {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Retrieve a single chargeback by its ID.
	 */
	get({ id, requestOptions }: ChargebackGetData): Promise<ChargebackResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Search chargebacks with optional filters.
	 */
	search(chargebackSearchOptions: ChargebackSearchData = {}): Promise<ChargebackSearchResponse> {
		const { options, requestOptions } = chargebackSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}
}
