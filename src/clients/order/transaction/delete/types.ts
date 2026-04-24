/**
 * Request and internal-client types for the delete transaction operation.
 *
 * @module clients/order/transaction/delete/types
 */

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Internal client payload passed to the delete transaction REST call.
 */
export declare type OrderDeleteTransactionClient = {
	/** Unique order identifier containing the transaction. */
	id: string;
	/** Unique identifier of the payment transaction to remove. */
	transactionId: string;
	/** SDK configuration (access token, default options). */
	config: MercadoPagoConfig;
}

/**
 * Public-facing input for {@link Order.deleteTransaction}.
 */
export declare type OrderDeleteTransactionData = {
	/** Unique order identifier containing the transaction. */
	id: string;
	/** Unique identifier of the payment transaction to remove. */
	transactionId: string;
	/** Per-call request options (timeout, idempotency key, etc.). */
	requestOptions?: Options;
}
