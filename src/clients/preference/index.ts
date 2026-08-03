/**
 * Checkout Pro Preference client for the MercadoPago Node SDK.
 *
 * A Preference defines everything the buyer sees in the Checkout Pro
 * payment flow: items, payer details, back URLs, shipping, payment
 * methods, and expiration rules. This module exposes CRUD + search
 * operations against the `/checkout/preferences` endpoint.
 *
 * @module clients/preference
 */

import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreferenceGetData } from './get/types';
import type { PreferenceUpdateData } from './update/types';
import type { PreferenceSearchData, PreferenceSearchResponse } from './search/types';
import type { PreferenceResponse } from './commonTypes';
import type { PreferenceCreateData } from './create/types';

/**
 * Client for managing Checkout Pro payment preferences.
 *
 * Each preference generates an `init_point` URL that redirects buyers
 * to MercadoPago's hosted checkout. Use this client to create, retrieve,
 * update, and search preferences.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class Preference {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Retrieve a single preference by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/get.ts Usage Example }.
	 */
	get({ preferenceId, requestOptions }: PreferenceGetData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id: preferenceId, config: this.config });
	}

	/**
	 * Create a new Checkout Pro preference and obtain an `init_point` URL.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/create.ts Usage Example }.
	 */
	create({ body, requestOptions }: PreferenceCreateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Update an existing preference (e.g. change items, amounts, or expiration).
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/update.ts Usage Example }.
	 */
	update({ id, updatePreferenceRequest, requestOptions }: PreferenceUpdateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreferenceRequest, config: this.config });
	}

	/**
	 * Search preferences using filters such as external reference or sponsor.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/search.ts Usage Example }.
	 */
	search(preferenceSearchData: PreferenceSearchData = {}): Promise<PreferenceSearchResponse> {
		const { options, requestOptions } = preferenceSearchData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

}
