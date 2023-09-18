import create from './create';
import get from './get';
import update from './update';
import search from './search';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { MerchantOrder as MerchantOrderObj } from './commonTypes';
import type { MerchantOrderCreate } from './create/types';
import type { MerchantOrderUpdate } from './update/types';
import type { MerchantOrderSearchOptions, MerchantOrderSearchResultsPage } from './search/types';

/**
 * Mercado Pago Merchant Order.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/merchant_orders/_merchant_orders/post Documentation }.
 */
export class MerchantOrder {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Mercado Pago Merchant Order create.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/merchantOrders/create/create.ts Usage Example  }.
	 */
	create({ body }: MerchantOrderCreate): Promise<MerchantOrderObj> {
		return create({ body, config: this.config });
	}

	/**
	 * Mercado Pago Merchant Order get.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/merchantOrders/get/get.ts Usage Example  }.
	 */
	get(merchantOrderId: string): Promise<MerchantOrderObj> {
		return get({ merchantOrderId, config: this.config });
	}

	/**
	 * Mercado Pago Merchant Order update.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/merchantOrders/update/update.ts Usage Example  }.
	 */
	update({ merchantOrderId, body }: MerchantOrderUpdate): Promise<MerchantOrderObj> {
		return update({ merchantOrderId, body, config: this.config });
	}

	/**
	 * Mercado Pago Merchant Order search.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/merchantOrders/search/search.ts Usage Example  }.
	 */
	search(filters?: MerchantOrderSearchOptions): Promise<MerchantOrderSearchResultsPage> {
		return search({ filters, config: this.config });
	}
}
