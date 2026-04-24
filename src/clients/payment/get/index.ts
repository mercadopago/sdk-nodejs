/**
 * Get-payment operation.
 *
 * Sends a `GET /v1/payments/:id` request to the MercadoPago API and
 * returns the full {@link PaymentResponse} for the given payment.
 *
 * @module clients/payment/get
 */
import { RestClient } from '@utils/restClient';
import type { PaymentResponse } from '../commonTypes';
import type { PaymentGetClient } from './types';

/**
 * Retrieve a single payment by its unique identifier.
 *
 * @param id     - Payment identifier to look up.
 * @param config - SDK configuration including the access token.
 * @returns The full payment resource.
 */
export default function get({ id, config }: PaymentGetClient): Promise<PaymentResponse>  {
	return RestClient.fetch<PaymentResponse>(
		`/v1/payments/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
