/**
 * Delete transaction operation -- sends `DELETE /v1/orders/{id}/transactions/{transactionId}`.
 *
 * @module clients/order/transaction/delete
 */

import { RestClient } from '@src/utils/restClient';
import { OrderDeleteTransactionClient } from './types';
import { ApiResponse } from '@src/types';

/**
 * Remove a payment transaction from an order.
 *
 * @returns A bare API response (status and headers only; no body).
 */
export default function deleteTransaction({ id, transactionId, config }: OrderDeleteTransactionClient): Promise<ApiResponse> {
	return RestClient.fetch(
		`/v1/orders/${id}/transactions/${transactionId}`,
		{
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
