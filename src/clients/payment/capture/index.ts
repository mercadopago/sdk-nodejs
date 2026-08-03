/**
 * Capture-payment operation.
 *
 * Sends a `PUT /v1/payments/:id` request with `{ capture: true }` to
 * finalize a previously authorized (pre-auth) payment.  An optional
 * `transaction_amount` enables partial captures.
 *
 * @module clients/payment/capture
 */
import { RestClient } from '@utils/restClient';
import type { PaymentResponse } from '../commonTypes';
import type { PaymentCaptureClient } from './types';

/**
 * Capture an authorized payment.
 *
 * @param id                 - Identifier of the authorized payment to capture.
 * @param transaction_amount - Amount to capture; omit for a full capture, provide a
 *                             lower value for a partial capture.
 * @param config             - SDK configuration including the access token.
 * @returns The updated payment resource with `captured: true`.
 */
export default function capture({ id, transaction_amount, config }: PaymentCaptureClient): Promise<PaymentResponse>  {
	const captureBody = {
		capture: true,
		transaction_amount
	};

	return RestClient.fetch<PaymentResponse>(
		`/v1/payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(captureBody),
			...config.options
		}
	);
}
