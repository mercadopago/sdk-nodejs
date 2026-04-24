/**
 * Create-payment operation.
 *
 * Sends a `POST /v1/payments` request to the MercadoPago API and returns
 * the newly created {@link PaymentResponse}.
 *
 * @module clients/payment/create
 */
import { RestClient } from '@src/utils/restClient';
import type { PaymentCreateClient } from './types';
import type { PaymentResponse } from '../commonTypes';

/**
 * Create a new payment.
 *
 * @param body   - Payment creation payload (amount, payer, method, etc.).
 * @param config - SDK configuration including the access token.
 * @returns The full payment resource as persisted by the API.
 */
export default function create({ body, config }: PaymentCreateClient): Promise<PaymentResponse> {
	return RestClient.fetch<PaymentResponse>(
		'/v1/payments',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
