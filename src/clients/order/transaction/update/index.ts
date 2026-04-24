/**
 * Update transaction operation -- sends `PUT /v1/orders/{id}/transactions/{transactionId}`.
 *
 * @module clients/order/transaction/update
 */

import { RestClient } from '@src/utils/restClient';
import { OrderUpdateTransactionClient } from './types';
import { PaymentApiResponse } from '../../commonTypes';

/**
 * Update an existing payment transaction within an order.
 *
 * Replaces the transaction's payment data (amount, payment method)
 * with the values provided in the request body.
 *
 * @returns The updated payment method details.
 */
export default function updateTransaction({ id, transactionId, body, config }: OrderUpdateTransactionClient): Promise<PaymentApiResponse> {
	return RestClient.fetch<PaymentApiResponse>(
		`/v1/orders/${id}/transactions/${transactionId}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
