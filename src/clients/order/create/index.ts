import { RestClient } from '@src/utils/restClient';
import { OrderCreateClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function create({ body, config }: OrderCreateClient): Promise<OrderResponse> {
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
