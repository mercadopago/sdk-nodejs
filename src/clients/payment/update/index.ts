/**
 * Update-payment operation.
 *
 * Sends a `PUT /v1/payments/:id` request with an arbitrary body to
 * update fields on an existing payment resource.
 *
 * @module clients/payment/update
 */
import { RestClient } from '@utils/restClient';
import type { PaymentResponse } from '../commonTypes';
import type { PaymentUpdateClient } from './types';

/**
 * Update a payment by its identifier.
 *
 * @param id     - Identifier of the payment to update.
 * @param body   - Fields to update on the payment resource.
 * @param config - SDK configuration including the access token.
 * @returns The updated payment resource.
 */
export default function update({ id, body, config }: PaymentUpdateClient): Promise<PaymentResponse> {
	return RestClient.fetch<PaymentResponse>(
		`/v1/payments/${id}`,
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
