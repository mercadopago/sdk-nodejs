/**
 * Implementation of the get-merchant-order operation.
 *
 * Sends a `GET /merchant_orders/{id}` request to retrieve a single
 * merchant order by its unique identifier.
 *
 * @module merchantOrder/get
 */

import { RestClient } from '@utils/restClient';

import type { MerchantOrderResponse } from '../commonTypes';
import type { MerchantOrderGetClient } from './types';

/**
 * Retrieve a merchant order by its ID.
 *
 * @returns The full merchant order including items, payments, and shipments.
 */
export default function get({ merchantOrderId, config }: MerchantOrderGetClient): Promise<MerchantOrderResponse> {
	return RestClient.fetch<MerchantOrderResponse>(
		`/merchant_orders/${merchantOrderId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}

