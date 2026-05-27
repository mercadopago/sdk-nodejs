/**
 * Implementation of the cancel-payment-intent operation for Point devices.
 *
 * Sends a `DELETE /point/integration-api/devices/{device_id}/payment-intents/{id}`
 * request to abort a pending payment intent on the terminal.
 *
 * @module point/cancelPaymentIntent
 */

import { RestClient } from '@src/utils/restClient';

import type { CancelPaymentIntentResponse } from '../commonTypes';
import type { PointCancelPaymentIntentClient } from './types';

/**
 * Cancel a pending payment intent on the specified Point device.
 *
 * @returns Confirmation containing the cancelled payment intent ID.
 */
export default function cancelPaymentIntent({ device_id, payment_intent_id, config }: PointCancelPaymentIntentClient): Promise<CancelPaymentIntentResponse> {
	return RestClient.fetch<CancelPaymentIntentResponse>(
		`/point/integration-api/devices/${device_id}/payment-intents/${payment_intent_id}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}
