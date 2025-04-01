import { RestClient } from '@src/utils/restClient';
import { OrderUpdateTransactionClient } from './types';
import { PaymentApiResponse } from '../../commonTypes';

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
