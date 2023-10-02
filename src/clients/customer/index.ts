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
 * Mercado Pago Customer.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/customers/_customers/post Documentation }.
 */
export class Customer {
	private config: MercadoPagoConfig;
	private customerCard: CustomerCard;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
		this.customerCard = new CustomerCard(mercadoPagoConfig);
	}

	/**
	 * Mercado Pago Customer create.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
	 */
	create ({ body, requestOptions }: CustomerCreateData): Promise<CustomerResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Mercado Pago customer get.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
	 */
	get({ customerId, requestOptions }: CustomerGetRemoveData): Promise<CustomerResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ customerId, config: this.config });
	}

	/**
	 * Mercado Pago customer remove.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
	 */
	remove({ customerId, requestOptions }: CustomerGetRemoveData): Promise<CustomerResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return remove({ customerId, config: this.config });
	}

	/**
	 * Mercado Pago customer update.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
	 */
	update({ customerId, body, requestOptions }: CustomerUpdateData): Promise<CustomerResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ customerId: customerId, body, config: this.config });
	}

	/**
	 * Mercado Pago customer search.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/search.ts Usage Example  }.
	 */
	search(CustomerSearchOptions: CustomerSearchData = {}): Promise<CustomerSearchResultsPage> {
		const { options, requestOptions } = CustomerSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
	 * Mercado Pago create card for customer.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/createCard.ts Usage Example  }.
	 */
	createCard({ customerId, body, requestOptions }: CustomerCardCreateData): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return this.customerCard.create({ customerId, body });
	}

	/**
	 * Mercado Pago  get customer's card.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/getCard.ts Usage Example  }.
	 */
	getCard({ customerId, cardId, requestOptions }: CustomerCardGetRemoveData ): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return this.customerCard.get({ customerId, cardId });
	}

	/**
	 * Mercado Pago remove customer's card .
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/removeCard.ts Usage Example  }.
	 */
	removeCard({ customerId, cardId, requestOptions }: CustomerCardGetRemoveData): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return this.customerCard.remove({ customerId, cardId: cardId });
	}

	/**
	 * Mercado Pago  list customer's cards .
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/listCards.ts Usage Example  }.
	 */
	listCards({ customerId, requestOptions }: CustomerCardListData): Promise<CustomerCardResponse[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return this.customerCard.list({ customerId });
	}
}
