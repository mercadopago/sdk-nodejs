/**
 * Create order operation -- sends `POST /v1/orders`.
 *
 * @module clients/order/create
 */

import { RestClient } from '@src/utils/restClient';
import { OrderCreateClient } from './types';
import { OrderResponse } from '../commonTypes';

/**
 * Create a new order via the MercadoPago Orders API.
 *
 * @returns The newly created order including its server-assigned `id` and initial `status`.
 */
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
