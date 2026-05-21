/**
 * Request and internal-client types for the create transaction operation.
 *
 * @module clients/order/transaction/create/types
 */

// API version: 7d364c51-04c7-45e3-af61-f82423bcc39c

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import { PaymentRequest } from '../../commonTypes';

/**
 * Internal client payload passed to the create transaction REST call.
 */
export declare type OrderCreateTransactionClient = {
	/** Unique order identifier to add transactions to. */
	id: string;
	/** Transaction creation request body. */
	body: OrderCreateTransactionRequest;
	/** SDK configuration (access token, default options). */
	config: MercadoPagoConfig;
}

/**
 * Public-facing input for {@link Order.createTransaction}.
 */
export declare type OrderCreateTransactionData = {
	/** Unique order identifier to add transactions to. */
	id: string;
	/** Transaction creation request body. */
	body: OrderCreateTransactionRequest;
	/** Per-call request options (timeout, idempotency key, etc.). */
	requestOptions?: Options;
}

/**
 * Request body for adding payment transactions to an existing order.
 */
export declare type OrderCreateTransactionRequest = {
	/** One or more payment entries to add to the order. */
	payments?: PaymentRequest[];
}
