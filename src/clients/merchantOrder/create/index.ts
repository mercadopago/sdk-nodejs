/**
 * Implementation of the create-merchant-order operation.
 *
 * Sends a `POST /merchant_orders` request to create a new order that
 * groups items, payments, and shipments.
 *
 * @module merchantOrder/create
 */

import { RestClient } from '@utils/restClient';

import type { MerchantOrderCreateClient } from './types';
import type { MerchantOrderResponse } from '../commonTypes';

/**
 * Create a new merchant order via `POST /merchant_orders`.
 *
 * @returns The newly created merchant order with all its details.
 */
export default function create({ body, config }: MerchantOrderCreateClient): Promise<MerchantOrderResponse> {
	return RestClient.fetch<MerchantOrderResponse>(
		'/merchant_orders',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: 'POST',
			...config.options
		}
	);
}

