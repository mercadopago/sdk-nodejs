import create from './create';
import get from './get';
import process from './process';
import createTransaction from './transaction/create';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { CreateOrderData } from './create/types';
import { OrderResponse, TransactionsResponse } from './commonTypes';
import { GetOrderData } from './get/types';
import { ProcessOrderData } from './process/types';
import { CreateOrderTransactionData } from './transaction/create/types';

/**
 * Mercado Pago Order.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class Order {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create Order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/create.ts Usage Example }.
	 */
	create({ body, requestOptions }: CreateOrderData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Get Order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/get.ts Usage Example }.
	 */
	get({ id, requestOptions }: GetOrderData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Process Order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/process.ts Usage Example }.
	 */
	process({ id, requestOptions }: ProcessOrderData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return process({ id, config: this.config });
	}

	/**
	 * Create Order transaction.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/create.ts Usage Example }.
	 */
	createTransaction({ id, body, requestOptions }: CreateOrderTransactionData): Promise<TransactionsResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createTransaction({ id, body, config: this.config });
	}
}
