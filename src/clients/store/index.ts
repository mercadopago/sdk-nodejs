/**
 * Store client for the MercadoPago API.
 *
 * Provides a method to create a store associated with a user
 * (seller) account.
 *
 * @module store
 */

import create from './create';
import get from './get';
import update from './update';
import search from './search';

import type { StoreCreateData, StoreResponse } from './create/types';
import type { StoreGetData, StoreResponse as StoreGetResponse } from './get/types';
import type { StoreUpdateData, StoreUpdateResponse } from './update/types';
import type { StoreSearchData, StoreSearchResultsPage } from './search/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Client facade for managing MercadoPago stores.
 *
 * Use this class to create stores associated with the user who owns
 * the current access token.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class Store {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a store for the given user.
	 *
	 * Calls the `POST /users/{user_id}/stores` endpoint and returns the
	 * created store information.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/store/create/create.ts Usage Example }.
	 */
	create(storeCreateData: StoreCreateData): Promise<StoreResponse> {
		const { requestOptions } = storeCreateData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ config: this.config, ...storeCreateData });
	}

	/**
	 * Retrieve a store by its ID.
	 *
	 * Calls the `GET /stores/{id}` endpoint and returns the store
	 * information.
	 */
	get(storeGetData: StoreGetData): Promise<StoreGetResponse> {
		const { requestOptions } = storeGetData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ config: this.config, ...storeGetData });
	}

	/**
	 * Search the stores of a user.
	 *
	 * Calls the `GET /users/{user_id}/stores/search` endpoint and returns
	 * a paginated page of stores matching the criteria.
	 */
	search(storeSearchData: StoreSearchData): Promise<StoreSearchResultsPage> {
		const { requestOptions } = storeSearchData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ config: this.config, ...storeSearchData });
	}

	/**
	 * Update an existing store.
	 *
	 * Calls the `PUT /users/{user_id}/stores/{id}` endpoint and returns
	 * the updated store information.
	 */
	update(storeUpdateData: StoreUpdateData): Promise<StoreUpdateResponse> {
		const { requestOptions } = storeUpdateData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ config: this.config, ...storeUpdateData });
	}
}
