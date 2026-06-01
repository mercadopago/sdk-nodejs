/**
 * Create advanced-payment operation.
 *
 * Sends a `POST /v1/advanced_payments` request to create a marketplace
 * split payment distributed among multiple sellers.
 *
 * @module advancedPayment/create
 */
import { RestClient } from '@utils/restClient';
import type { AdvancedPaymentCreateClient } from './types';
import type { AdvancedPaymentResponse } from '../commonTypes';

/**
 * Create a new advanced (split) payment.
 */
export default function create({ body, config }: AdvancedPaymentCreateClient): Promise<AdvancedPaymentResponse> {
	return RestClient.fetch<AdvancedPaymentResponse>(
		'/v1/advanced_payments',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
