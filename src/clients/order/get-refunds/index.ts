/**
 * Get refunds operation for orders.
 *
 * Sends a `GET /v1/orders/:id/refund` request to retrieve all refunds
 * associated with a specific order.
 *
 * @module order/get-refunds
 */
import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { OrderGetRefundsClient, OrderGetRefundsResponse } from './types';

/**
 * Retrieve all refunds for a given order.
 *
 * @param id     - Unique order identifier.
 * @param config - SDK configuration including the access token.
 * @returns List of refunds associated with the order.
 */
export default function getRefunds({ id, config }: OrderGetRefundsClient): Promise<OrderGetRefundsResponse> {
	return RestClient.fetch<OrderGetRefundsResponse>(
		`/v1/orders/${encodePathParam(id)}/refund`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}