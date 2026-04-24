/**
 * Cancel order operation -- sends `POST /v1/orders/{id}/cancel`.
 *
 * @module clients/order/cancel
 */

import { RestClient } from '@src/utils/restClient';
import { OrderCancelClient } from './types';
import { OrderResponse } from '../commonTypes';

/**
 * Cancel an order that has not yet been captured.
 *
 * @returns The updated order with a `cancelled` status.
 */
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
