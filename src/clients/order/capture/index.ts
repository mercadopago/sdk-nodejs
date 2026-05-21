import { RestClient } from '@src/utils/restClient';
import { OrderCaptureClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function capture({ id, config }: OrderCaptureClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/capture`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}