/**
 * Implementation of the create-payment-intent operation for Point devices.
 *
 * Sends a `POST /point/integration-api/devices/{device_id}/payment-intents`
 * request to instruct the terminal to begin a new payment flow.
 *
 * @module point/createPaymentIntent
 */

import { RestClient } from '@src/utils/restClient';

import type { PointCreatePaymentIntentClient } from './types';
import type { PaymentIntentResponse } from '../commonTypes';

/**
 * Create a payment intent on the specified Point device.
 *
 * @returns The newly created payment intent with its current state.
 */
export default function createPaymentIntent({ device_id, request, config }: PointCreatePaymentIntentClient): Promise<PaymentIntentResponse> {
	return RestClient.fetch<PaymentIntentResponse>(
		`/point/integration-api/devices/${device_id}/payment-intents`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(request),
			...config.options,
		}
	);
}
