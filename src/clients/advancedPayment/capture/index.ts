/**
 * Capture advanced-payment operation.
 *
 * Sends a `PUT /v1/advanced_payments/:id` with `{ capture: true }` to
 * finalise a two-step (authorise → capture) payment flow.
 *
 * @module advancedPayment/capture
 */
import { RestClient } from '@utils/restClient';
import type { AdvancedPaymentCaptureClient } from './types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export default function capture({ id, config }: AdvancedPaymentCaptureClient): Promise<AdvancedPaymentResponse> {
	return RestClient.fetch<AdvancedPaymentResponse>(
		`/v1/advanced_payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify({ capture: true }),
			...config.options
		}
	);
}
