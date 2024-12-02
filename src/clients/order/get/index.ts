import { RestClient } from '@src/utils/restClient';
import { GetOrderClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function get({ id, config }: 
  GetOrderClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}