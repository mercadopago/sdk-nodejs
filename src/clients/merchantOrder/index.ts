/**
 * Merchant Order client for the MercadoPago API.
 *
 * Provides methods to create, retrieve, update, and search merchant orders.
 * A merchant order groups multiple payments, items, and shipments under
 * a single order entity, typically originating from a checkout preference.
 *
 * @module merchantOrder
 */

import create from './create';
import get from './get';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { MerchantOrderResponse } from './commonTypes';
import type { MerchantOrderCreateData } from './create/types';
import type { MerchantOrderUpdateData } from './update/types';
import type { MerchantOrderSearchData, MerchantOrderSearchResultsPage } from './search/types';
import type { MerchantOrderGetData } from './get/types';

/**
 * Client facade for MercadoPago Merchant Order operations.
 *
 * Use this class to manage orders that aggregate payments, items, and
 * shipments originating from checkout preferences or marketplace flows.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/merchant_orders/_merchant_orders/post Documentation }.
 */
export class MerchantOrder {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new merchant order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/create.ts Usage Example }.
	 */
	create({ body, requestOptions }: MerchantOrderCreateData): Promise<MerchantOrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a merchant order by its ID.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/get.ts Usage Example }.
	 */
	get({ merchantOrderId, requestOptions }: MerchantOrderGetData): Promise<MerchantOrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ merchantOrderId, config: this.config });
	}

	/**
	 * Update an existing merchant order (items, shipments, notification URL, etc.).
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/update.ts Usage Example }.
	 */
	update({ merchantOrderId, body, requestOptions }: MerchantOrderUpdateData): Promise<MerchantOrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ merchantOrderId, body, config: this.config });
	}

	/**
	 * Search merchant orders with optional filters such as status, payer, or date range.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/search.ts Usage Example }.
	 */
	search(merchantOrderSearchOptions: MerchantOrderSearchData = {}): Promise<MerchantOrderSearchResultsPage> {
		const { options, requestOptions } = merchantOrderSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}
}
