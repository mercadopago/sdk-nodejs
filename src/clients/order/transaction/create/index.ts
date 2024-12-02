import { RestClient } from '@src/utils/restClient';
import { TransactionsResponse } from '../../commonTypes';
import { CreateOrderTransactionClient } from './types';

export default function createTransaction({ id, body, config }: CreateOrderTransactionClient): Promise<TransactionsResponse> {
	return RestClient.fetch<TransactionsResponse>(
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
