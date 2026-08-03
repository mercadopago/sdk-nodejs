/**
 * Update advanced-payment operation.
 *
 * Sends a `PUT /v1/advanced_payments/:id` request.
 *
 * @module advancedPayment/update
 */
import { RestClient } from '@utils/restClient';
import type { AdvancedPaymentUpdateClient } from './types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export default function update({ id, body, config }: AdvancedPaymentUpdateClient): Promise<AdvancedPaymentResponse> {
	return RestClient.fetch<AdvancedPaymentResponse>(
		`/v1/advanced_payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
