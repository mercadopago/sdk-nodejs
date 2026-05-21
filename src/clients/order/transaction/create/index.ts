/**
 * Create transaction operation -- sends `POST /v1/orders/{id}/transactions`.
 *
 * @module clients/order/transaction/create
 */

import { RestClient } from '@src/utils/restClient';
import { TransactionsApiResponse } from '../../commonTypes';
import { OrderCreateTransactionClient } from './types';

/**
 * Add one or more payment transactions to an existing order.
 *
 * @returns The created payment transactions.
 */
export default function createTransaction({ id, body, config }: OrderCreateTransactionClient): Promise<TransactionsApiResponse> {
	return RestClient.fetch<TransactionsApiResponse>(
		`/v1/orders/${id}/transactions`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
