/**
 * Process order operation -- sends `POST /v1/orders/{id}/process`.
 *
 * @module clients/order/process
 */

import { RestClient } from '@src/utils/restClient';
import { OrderProcessClient } from './types';
import { OrderResponse } from '../commonTypes';

/**
 * Process an order, triggering payment execution for its transactions.
 *
 * The order must already contain at least one payment transaction
 * before it can be processed.
 *
 * @returns The updated order with the resulting payment statuses.
 */
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