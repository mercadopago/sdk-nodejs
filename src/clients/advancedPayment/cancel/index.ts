/**
 * Cancel advanced-payment operation.
 *
 * Sends a `PUT /v1/advanced_payments/:id` with `{ status: "cancelled" }`.
 *
 * @module advancedPayment/cancel
 */
import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { AdvancedPaymentCancelClient } from './types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export default function cancel({ id, config }: AdvancedPaymentCancelClient): Promise<AdvancedPaymentResponse> {
	return RestClient.fetch<AdvancedPaymentResponse>(
		`/v1/advanced_payments/${encodePathParam(id)}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify({ status: 'cancelled' }),
			...config.options
		}
	);
}
