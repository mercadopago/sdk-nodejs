/**
 * Get order operation -- sends `GET /v1/orders/{id}`.
 *
 * @module clients/order/get
 */

import { RestClient } from '@src/utils/restClient';
import { OrderGetClient } from './types';
import { OrderResponse } from '../commonTypes';

/**
 * Retrieve a single order by its unique identifier.
 *
 * @returns The full order representation including transactions and status.
 */
export default function get({ id, config }: OrderGetClient): Promise<OrderResponse> {
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