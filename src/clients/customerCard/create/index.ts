/**
 * Implementation of the customer card creation operation.
 *
 * Sends a POST request to `/v1/customers/:id/cards` to save a new
 * payment card for a customer using a previously generated card token.
 *
 * @module clients/customerCard/create
 */

import { RestClient } from '@utils/restClient';

import type { CustomerCardResponse } from '../commonTypes';
import type { CustomerCardCreateClient } from './types';

/**
 * Save a new payment card for a customer.
 *
 * @returns The newly created card record.
 */
export default function create({ customerId, body, config }: CustomerCardCreateClient): Promise<CustomerCardResponse> {
	return RestClient.fetch<CustomerCardResponse>(
		`/v1/customers/${customerId}/cards`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: 'POST',
			...config.options
		}
	);
}
