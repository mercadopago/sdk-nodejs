import get from './get';
import create from './create';
import remove from './remove';
import update from './update';
import list from './list';

import type { CustomerCardCreate } from './create/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerCardIds } from './get/types';
import type { CustomerCardUpdate } from './update/types';
import type { CustomerCardId } from './list/types';
import type { CustomerCardResponse } from './commonTypes';
import type { Options } from '@src/types';

/**
 * Mercado Pago Customer card.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post Documentation }.
 */
export class CustomerCard {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Mercado Pago Customer card create.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
	 */
	create ({ customerId, customerCardBody }: CustomerCardCreate, requestOptions?: Options): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ customerId: customerId, body: customerCardBody, config: this.config });
	}

	/**
	 * Mercado Pago customer card get.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
	*/
	get({ customerId, cardId }: CustomerCardIds, requestOptions?: Options): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ customerId: customerId, cardId: cardId, config: this.config });
	}

	/**
	 * Mercado Pago customer card remove.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
	 */
	remove({ customerId, cardId }: CustomerCardIds, requestOptions?: Options): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return remove({ customerId: customerId, cardId: cardId, config: this.config });
	}

	/**
	 * Mercado Pago customer card update.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
	 */
	update({ customerId, cardId, customerCardBody }: CustomerCardUpdate, requestOptions?: Options): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ customerId: customerId, cardId: cardId, body: customerCardBody , config: this.config });
	}

	/**
	 * Mercado Pago customer card list.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/list.ts Usage Example  }.
	 */
	list({ customerId }: CustomerCardId, requestOptions?: Options): Promise<CustomerCardResponse[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return list({ customerId: customerId, config: this.config });
	}
}
