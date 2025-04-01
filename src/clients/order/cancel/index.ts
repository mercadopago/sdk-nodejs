import { RestClient } from '@src/utils/restClient';
import { OrderCancelClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function cancel({ id, config }: OrderCancelClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/cancel`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
