/**
 * Order API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing orders through the `/v1/orders`
 * resource. Supports creating, retrieving, processing, capturing, canceling,
 * and refunding orders, as well as managing transactions within orders.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference MercadoPago Orders API reference}
 * @module clients/order
 */

import create from './create';
import get from './get';
import process from './process';
import capture from './capture';
import cancel from './cancel';
import refund from './refund';
import confirm from './confirm';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { OrderResponse } from './commonTypes';
import type { OrderCreateData } from './create/types';
import type { OrderGetData } from './get/types';
import type { OrderProcessData } from './process/types';
import type { OrderCaptureData } from './capture/types';
import type { OrderCancelData } from './cancel/types';
import type { OrderRefundData } from './refund/types';
import type { OrderConfirmData } from './confirm/types';
import type { OrderTransactionCreateData, OrderTransactionCreateResponse } from './transaction/create/types';
import type { OrderTransactionUpdateData, OrderTransactionUpdateResponse } from './transaction/update/types';
import type { OrderTransactionDeleteData, OrderTransactionDeleteResponse } from './transaction/delete/types';

/**
 * Client for the MercadoPago Orders API.
 *
 * Exposes operations on orders including creation, retrieval, processing,
 * capture, cancellation, and refund, as well as transaction management.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference API reference}
 */
export class Order {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new order in MercadoPago.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/create.ts Usage Example}.
	 */
	create({ body, requestOptions }: OrderCreateData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single order by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/get.ts Usage Example}.
	 */
	get({ id, requestOptions }: OrderGetData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Process an order that was created in manual processing mode.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/process.ts Usage Example}.
	 */
	process({ id, requestOptions }: OrderProcessData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return process({ id, config: this.config });
	}

	/**
	 * Capture a previously authorized order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/capture.ts Usage Example}.
	 */
	capture({ id, requestOptions }: OrderCaptureData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}

	/**
	 * Cancel a pending order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/cancel.ts Usage Example}.
	 */
	cancel({ id, requestOptions }: OrderCancelData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config });
	}

	/**
	 * Refund an order, either partially or in full.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/refund.ts Usage Example}.
	 */
	refund({ id, body, requestOptions }: OrderRefundData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refund({ id, body, config: this.config });
	}

	/**
	 * Confirm transaction amounts in an order.
	 * 
	 * This endpoint is only supported for instore QR payment type and allows
	 * confirming the final amounts for transactions that were previously
	 * created in the order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/confirm.ts Usage Example}.
	 */
	confirm({ id, body, requestOptions }: OrderConfirmData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return confirm({ id, body, config: this.config });
	}

	/**
	 * Create a new transaction (payment) within an existing order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/transaction/create.ts Usage Example}.
	 */
	createTransaction({ id, body, requestOptions }: OrderTransactionCreateData): Promise<OrderTransactionCreateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createTransaction({ id, body, config: this.config });
	}

	/**
	 * Update an existing transaction within an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/transaction/update.ts Usage Example}.
	 */
	updateTransaction({ id, transactionId, body, requestOptions }: OrderTransactionUpdateData): Promise<OrderTransactionUpdateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return updateTransaction({ id, transactionId, body, config: this.config });
	}

	/**
	 * Delete a transaction from an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/transaction/delete.ts Usage Example}.
	 */
	deleteTransaction({ id, transactionId, requestOptions }: OrderTransactionDeleteData): Promise<OrderTransactionDeleteResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return deleteTransaction({ id, transactionId, config: this.config });
	}
}