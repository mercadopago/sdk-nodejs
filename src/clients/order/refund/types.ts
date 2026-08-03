/**
 * Request and internal-client types for the refund order operation.
 *
 * @module clients/order/refund/types
 */

// API version: 7d364c51-04c7-45e3-af61-f82423bcc39c

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input for {@link Order.refund}.
 */
export declare type OrderRefundData = {
	/** Unique order identifier to refund. */
	id: string;
	/** Refund details. Omit for a full refund of all transactions. */
	body?: RefundRequest;
	/** Per-call request options (timeout, idempotency key, etc.). */
	requestOptions?: Options;
}

/**
 * Internal client payload passed to the refund order REST call.
 */
export declare type OrderRefundClient = {
	/** SDK configuration (access token, default options). */
	config: MercadoPagoConfig;
	/** Unique order identifier to refund. */
	id: string;
	/** Refund details. Omit for a full refund of all transactions. */
	body?: RefundRequest;
}

/**
 * Refund request body specifying which transactions to refund.
 *
 * When omitted or empty, the API performs a full refund of the entire order.
 */
export declare type RefundRequest = {
	/** Individual transaction refund entries for partial refunds. */
	transactions?: TransactionRefundRequest[];
}

/**
 * Single transaction refund entry within a partial refund request.
 */
export declare type TransactionRefundRequest = {
	/** Payment transaction identifier to refund. */
	id?: string;
	/** Amount to refund for this transaction as a decimal string. */
	amount?: string;
}
