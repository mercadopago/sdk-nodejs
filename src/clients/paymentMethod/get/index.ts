/**
 * Implementation of the get-payment-methods operation.
 *
 * Sends a `GET /v1/payment_methods` request to retrieve all payment
 * methods available for the authenticated seller's site/country.
 *
 * @module paymentMethod/get
 */

import { RestClient } from '@utils/restClient';

import type { PaymentMethodGetClient, PaymentMethodResponse } from './types';

/**
 * Retrieve the list of available payment methods.
 *
 * @returns An array of payment methods with their configuration and constraints.
 */
export default function get({ config }: PaymentMethodGetClient): Promise<PaymentMethodResponse[]> {
	return RestClient.fetch<PaymentMethodResponse[]>(
		'/v1/payment_methods',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
