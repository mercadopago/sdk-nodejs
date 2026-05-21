import { RestClient } from '@src/utils/restClient';
import { OrderProcessClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function process({ id, config }: OrderProcessClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/process`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}