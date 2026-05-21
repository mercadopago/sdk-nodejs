/**
 * Implementation of the update-merchant-order operation.
 *
 * Sends a `PUT /merchant_orders/{id}` request to modify an existing
 * merchant order's items, shipments, or metadata.
 *
 * @module merchantOrder/update
 */

import { RestClient } from '@utils/restClient';

import type { MerchantOrderResponse } from '../commonTypes';
import type { MerchantOrderUpdateClient } from './types';

/**
 * Update an existing merchant order via `PUT /merchant_orders/{id}`.
 *
 * @returns The updated merchant order with all its details.
 */
export default function update({ merchantOrderId, body, config }: MerchantOrderUpdateClient): Promise<MerchantOrderResponse> {
	return RestClient.fetch<MerchantOrderResponse>(
		`/merchant_orders/${merchantOrderId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: 'PUT',
			...config.options
		}
	);
}

