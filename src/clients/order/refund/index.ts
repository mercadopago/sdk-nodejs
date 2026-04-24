/**
 * Refund order operation -- sends `POST /v1/orders/{id}/refund`.
 *
 * @module clients/order/refund
 */

import { RestClient } from '@src/utils/restClient';
import { OrderRefundClient } from './types';
import { OrderResponse } from '../commonTypes';

/**
 * Refund an order (total or partial).
 *
 * Omit the body for a full refund of all transactions. Provide
 * specific transaction IDs and amounts for a partial refund.
 *
 * @returns The updated order including the new refund records.
 */
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
