/**
 * Get advanced-payment operation.
 *
 * Sends a `GET /v1/advanced_payments/:id` request.
 *
 * @module advancedPayment/get
 */
import { RestClient } from '@utils/restClient';
import type { AdvancedPaymentGetClient } from './types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export default function get({ id, config }: AdvancedPaymentGetClient): Promise<AdvancedPaymentResponse> {
	return RestClient.fetch<AdvancedPaymentResponse>(
		`/v1/advanced_payments/${id}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
