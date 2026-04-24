/**
 * Cancel-payment operation.
 *
 * Sends a `PUT /v1/payments/:id` request with `{ status: "cancelled" }`
 * to transition a pending or in-process payment into the `cancelled` state.
 *
 * @module clients/payment/cancel
 */
import { RestClient } from '@utils/restClient';
import type { PaymentResponse } from '../commonTypes';
import type { PaymentCancelClient } from './types';

/**
 * Cancel a payment that has not yet been approved.
 *
 * @param id     - Identifier of the payment to cancel.
 * @param config - SDK configuration including the access token.
 * @returns The updated payment resource with status `cancelled`.
 */
export default function cancel({ id, config }: PaymentCancelClient): Promise<PaymentResponse>  {
	const cancelBody = {
		status: 'cancelled'
	};
	return RestClient.fetch<PaymentResponse>(
		`/v1/payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(cancelBody),
			...config.options
		}
	);
}
