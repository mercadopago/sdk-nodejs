import { RestClient } from '@src/utils/restClient';
import { CreateOrderClient, OrderResponse } from './types';

export default function create({ body, config }: CreateOrderClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		'/v1/orders',
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
