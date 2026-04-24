/**
 * Customer API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing customers and their saved
 * payment cards through the `/v1/customers` resource.  Card-related
 * convenience methods delegate to the {@link CustomerCard} client
 * internally.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/customers/_customers/post MercadoPago Customers API reference}
 * @module clients/customer
 */

import get from './get';
import create from './create';
import remove from './remove';
import update from './update';
import search from './search';
import { CustomerCard } from '@src/clients/customerCard';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerGetRemoveData, CustomerResponse } from './commonTypes';
import type { CustomerUpdateData } from './update/types';
import type { CustomerSearchData, CustomerSearchResultsPage } from './search/types';
import type { CustomerCardResponse, CustomerCardGetRemoveData } from '../customerCard/commonTypes';
import type { CustomerCardListData } from '../customerCard/list/types';
import type { CustomerCreateData } from './create/types';
import type { CustomerCardCreateData } from '../customerCard/create/types';

/**
 * Client for the MercadoPago Customers API.
 *
 * Exposes CRUD operations on customers as well as convenience methods
 * for managing the saved payment cards associated with each customer.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/customers/_customers/post API reference}
 */
export class Customer {
	private config: MercadoPagoConfig;
	private customerCard: CustomerCard;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
		this.customerCard = new CustomerCard(mercadoPagoConfig);
	}

	/**
	 * Create a new customer in MercadoPago.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
	 */
	create ({ body, requestOptions }: CustomerCreateData): Promise<CustomerResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single customer by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
	 */
	get({ customerId, requestOptions }: CustomerGetRemoveData): Promise<CustomerResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ customerId, config: this.config });
	}

	/**
	 * Remove an existing customer by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
	 */
	remove({ customerId, requestOptions }: CustomerGetRemoveData): Promise<CustomerResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return remove({ customerId, config: this.config });
	}

	/**
	 * Update an existing customer's information.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
	 */
	update({ customerId, body, requestOptions }: CustomerUpdateData): Promise<CustomerResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ customerId: customerId, body, config: this.config });
	}

	/**
	 * Search for customers using optional filters and pagination.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/search.ts Usage Example  }.
	 */
	search(CustomerSearchOptions: CustomerSearchData = {}): Promise<CustomerSearchResultsPage> {
		const { options, requestOptions } = CustomerSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
	 * Save a new payment card for a customer using a card token.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/createCard.ts Usage Example  }.
	 */
	createCard({ customerId, body, requestOptions }: CustomerCardCreateData): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return this.customerCard.create({ customerId, body });
	}

	/**
	 * Retrieve a specific saved card for a customer.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/getCard.ts Usage Example  }.
	 */
	getCard({ customerId, cardId, requestOptions }: CustomerCardGetRemoveData ): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return this.customerCard.get({ customerId, cardId });
	}

	/**
	 * Remove a saved card from a customer's account.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/removeCard.ts Usage Example  }.
	 */
	removeCard({ customerId, cardId, requestOptions }: CustomerCardGetRemoveData): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return this.customerCard.remove({ customerId, cardId: cardId });
	}

	/**
	 * List all saved payment cards for a customer.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/listCards.ts Usage Example  }.
	 */
	listCards({ customerId, requestOptions }: CustomerCardListData): Promise<CustomerCardResponse[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return this.customerCard.list({ customerId });
	}
}
