import { RestClient } from '@src/utils/restClient';
import { CancelOrderClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function cancel({ id, config }: 
  CancelOrderClient): Promise<OrderResponse> {
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