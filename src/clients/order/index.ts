import create from './create';
import get from './get';
import process from './process';
import capture from './capture';
import cancel from './cancel';
import refund from './refund';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { OrderResponse, PaymentApiResponse, TransactionsApiResponse } from './commonTypes';
import { OrderCreateData } from './create/types';
import { OrderGetData } from './get/types';
import { OrderProcessData } from './process/types';
import { OrderCaptureData } from './capture/types';
import { OrderCancelData } from './cancel/types';
import { OrderRefundData } from './refund/types';
import { OrderCreateTransactionData } from './transaction/create/types';
import { OrderUpdateTransactionData } from './transaction/update/types';
import { OrderDeleteTransactionData } from './transaction/delete/types';
import { ApiResponse } from '@src/types';

/**
 * Mercado Pago Order.
 *
 * @see {@link https://mercadopago.com/developers/en/docs/order/landing Documentation }.
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
	create({ body, requestOptions }: OrderCreateData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Get Order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/get.ts Usage Example }.
	 */
	get({ id, requestOptions }: OrderGetData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Process Order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/process.ts Usage Example }.
	 */
	process({ id, requestOptions }: OrderProcessData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return process({ id, config: this.config });
	}

	/**
	 * Capture Order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/capture.ts Usage Example }.
	 */
	capture({ id, requestOptions }: OrderCaptureData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}

	/**
	 * Cancel Order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/cancel.ts Usage Example }.
	 */
	cancel({ id, requestOptions }: OrderCancelData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config });
	}

	/**
	 * Refund Order (total or partial).
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/refundTotal.ts Usage Example }.
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/refundPartial.ts Usage Example }.
	 */
	refund({ id, body, requestOptions }: OrderRefundData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refund({ id, body, config: this.config });
	}

	/**
	 * Create Order transaction.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/create.ts Usage Example }.
	 */
	createTransaction({ id, body, requestOptions }: OrderCreateTransactionData): Promise<TransactionsApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createTransaction({ id, body, config: this.config });
	}

	/**
	 * Update Order transaction.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/update.ts Usage Example }.
	 */
	updateTransaction({ id, transactionId, body, requestOptions }: OrderUpdateTransactionData): Promise<PaymentApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return updateTransaction({ id, transactionId, body, config: this.config });
	}

	/**
	 * Delete Order transaction.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/delete.ts Usage Example }.
	 */
	deleteTransaction({ id, transactionId, requestOptions }: OrderDeleteTransactionData): Promise<ApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return deleteTransaction({ id, transactionId, config: this.config });
	}
}
