import { RestClient } from '@src/utils/restClient';
import { OrderRefundClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function refund({ id, body, config }: OrderRefundClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/refund`,
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
