import { RestClient } from '@src/utils/restClient';
import { OrderDeleteTransactionClient } from './types';
import { ApiResponse } from '@src/types';

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
