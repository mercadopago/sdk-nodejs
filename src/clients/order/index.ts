/**
 * Order API client -- facade for the MercadoPago Orders v1 endpoints.
 *
 * Exposes every order lifecycle operation (create, get, process, capture,
 * cancel, refund, search) as well as transaction-level management
 * (create, update, delete) on an existing order.
 *
 * @module clients/order
 * @see {@link https://mercadopago.com/developers/en/docs/order/landing Orders API Documentation}
 */

import create from './create';
import get from './get';
import process from './process';
import capture from './capture';
import cancel from './cancel';
import refund from './refund';
import search from './search';
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
import { OrderSearchData, OrderSearchResponse } from './search/types';
import { OrderCreateTransactionData } from './transaction/create/types';
import { OrderUpdateTransactionData } from './transaction/update/types';
import { OrderDeleteTransactionData } from './transaction/delete/types';
import { ApiResponse } from '@src/types';

/**
 * Client for the MercadoPago Orders API.
 *
 * Each method maps 1-to-1 with an Orders REST endpoint and returns a
 * promise that resolves to the API response. Per-call `requestOptions`
 * are merged with the global {@link MercadoPagoConfig} options so
 * callers can override timeouts, idempotency keys, etc.
 *
 * @see {@link https://mercadopago.com/developers/en/docs/order/landing Documentation}
 */
export class Order {
	/** SDK configuration (access token, default options). */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new order.
	 *
	 * Sends a `POST /v1/orders` request with the provided order body.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/create.ts Usage Example}
	 */
	create({ body, requestOptions }: OrderCreateData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve an existing order by its ID.
	 *
	 * Sends a `GET /v1/orders/{id}` request.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/get.ts Usage Example}
	 */
	get({ id, requestOptions }: OrderGetData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Process an order, triggering payment execution.
	 *
	 * Sends a `POST /v1/orders/{id}/process` request. The order must
	 * already contain at least one payment transaction.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/process.ts Usage Example}
	 */
	process({ id, requestOptions }: OrderProcessData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return process({ id, config: this.config });
	}

	/**
	 * Capture an authorized order, confirming the payment settlement.
	 *
	 * Sends a `POST /v1/orders/{id}/capture` request. Only applicable
	 * to orders created with `capture_mode: "manual"`.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/capture.ts Usage Example}
	 */
	capture({ id, requestOptions }: OrderCaptureData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}

	/**
	 * Cancel an order that has not yet been captured.
	 *
	 * Sends a `POST /v1/orders/{id}/cancel` request.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/cancel.ts Usage Example}
	 */
	cancel({ id, requestOptions }: OrderCancelData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config });
	}

	/**
	 * Refund an order (total or partial).
	 *
	 * Sends a `POST /v1/orders/{id}/refund` request. Omit the body
	 * for a full refund; provide specific transaction amounts for a
	 * partial refund.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/refundTotal.ts Total Refund Example}
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/refundPartial.ts Partial Refund Example}
	 */
	refund({ id, body, requestOptions }: OrderRefundData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refund({ id, body, config: this.config });
	}

	/**
	 * Search orders by date range and optional filters.
	 *
	 * Sends a `GET /v1/orders` request with query parameters built from
	 * the provided search options. Returns a paginated result set.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/search.ts Usage Example}
	 */
	search(searchData?: OrderSearchData): Promise<OrderSearchResponse> {
		const options = searchData?.options;
		const requestOptions = searchData?.requestOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
	 * Add a payment transaction to an existing order.
	 *
	 * Sends a `POST /v1/orders/{id}/transactions` request.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/create.ts Usage Example}
	 */
	createTransaction({ id, body, requestOptions }: OrderCreateTransactionData): Promise<TransactionsApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createTransaction({ id, body, config: this.config });
	}

	/**
	 * Update an existing payment transaction within an order.
	 *
	 * Sends a `PUT /v1/orders/{id}/transactions/{transactionId}` request.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/update.ts Usage Example}
	 */
	updateTransaction({ id, transactionId, body, requestOptions }: OrderUpdateTransactionData): Promise<PaymentApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return updateTransaction({ id, transactionId, body, config: this.config });
	}

	/**
	 * Remove a payment transaction from an order.
	 *
	 * Sends a `DELETE /v1/orders/{id}/transactions/{transactionId}` request.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/delete.ts Usage Example}
	 */
	deleteTransaction({ id, transactionId, requestOptions }: OrderDeleteTransactionData): Promise<ApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return deleteTransaction({ id, transactionId, config: this.config });
	}
}
