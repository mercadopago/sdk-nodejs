/**
 * Capture order operation -- sends `POST /v1/orders/{id}/capture`.
 *
 * @module clients/order/capture
 */

import { RestClient } from '@src/utils/restClient';
import { OrderCaptureClient } from './types';
import { OrderResponse } from '../commonTypes';

/**
 * Capture an authorized order, confirming the payment settlement.
 *
 * Only applicable to orders created with `capture_mode: "manual"`.
 *
 * @returns The updated order with captured payment status.
 */
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