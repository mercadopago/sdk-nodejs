/**
 * Request and internal-client types for the update transaction operation.
 *
 * @module clients/order/transaction/update/types
 */

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { PaymentRequest } from '../../commonTypes';
import { Options } from '@src/types';

/**
 * Internal client payload passed to the update transaction REST call.
 */
export declare type OrderUpdateTransactionClient = {
	/** Unique order identifier containing the transaction. */
	id: string;
	/** Unique identifier of the payment transaction to update. */
	transactionId: string;
	/** Updated payment data (amount and/or payment method). */
	body: PaymentRequest;
	/** SDK configuration (access token, default options). */
	config: MercadoPagoConfig;
}

/**
 * Public-facing input for {@link Order.updateTransaction}.
 */
export declare type OrderUpdateTransactionData = {
	/** Unique order identifier containing the transaction. */
	id: string;
	/** Unique identifier of the payment transaction to update. */
	transactionId: string;
	/** Updated payment data (amount and/or payment method). */
	body: PaymentRequest;
	/** Per-call request options (timeout, idempotency key, etc.). */
	requestOptions?: Options;
}
