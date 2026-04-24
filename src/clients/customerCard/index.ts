/**
 * CustomerCard API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing the saved payment cards
 * associated with a customer through the
 * `/v1/customers/:customer_id/cards` resource.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post MercadoPago Customer Cards API reference}
 * @module clients/customerCard
 */

import get from './get';
import create from './create';
import remove from './remove';
import update from './update';
import list from './list';

import type { CustomerCardCreateData } from './create/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerCardUpdateData } from './update/types';
import type { CustomerCardListData } from './list/types';
import type { CustomerCardResponse, CustomerCardGetRemoveData } from './commonTypes';

/**
 * Client for the MercadoPago Customer Cards API.
 *
 * Exposes CRUD and list operations on the saved payment cards that
 * belong to a specific customer.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post API reference}
 */
export class CustomerCard {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Save a new payment card for a customer using a card token.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
	 */
	create ({ customerId, body, requestOptions }: CustomerCardCreateData): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ customerId: customerId, body, config: this.config });
	}

	/**
	 * Retrieve a specific saved card for a customer.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
	*/
	get({ customerId, cardId, requestOptions }: CustomerCardGetRemoveData): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ customerId: customerId, cardId: cardId, config: this.config });
	}

	/**
	 * Remove a saved card from a customer's wallet.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
	 */
	remove({ customerId, cardId, requestOptions }: CustomerCardGetRemoveData ): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return remove({ customerId: customerId, cardId: cardId, config: this.config });
	}

	/**
	 * Update the details of an existing saved card (e.g. expiration date or cardholder info).
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
	 */
	update({ customerId, cardId, body, requestOptions }: CustomerCardUpdateData ): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ customerId: customerId, cardId: cardId, body , config: this.config });
	}

	/**
	 * List all saved payment cards for a customer.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/list.ts Usage Example  }.
	 */
	list({ customerId, requestOptions }: CustomerCardListData ): Promise<CustomerCardResponse[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return list({ customerId: customerId, config: this.config });
	}
}
