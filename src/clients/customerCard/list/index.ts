/**
 * Implementation of the customer card list operation.
 *
 * Sends a GET request to `/v1/customers/:id/cards` to retrieve all
 * saved payment cards for a customer.
 *
 * @module clients/customerCard/list
 */

import { RestClient } from '@utils/restClient';

import type { CustomerCardListClient } from './types';
import type { CustomerCardResponse } from '../commonTypes';

/**
 * List all saved payment cards for a customer.
 *
 * @returns An array of card records belonging to the customer.
 */
export default function list({ customerId, config }: CustomerCardListClient): Promise<CustomerCardResponse[]> {
	return RestClient.fetch<CustomerCardResponse[]>(
		`/v1/customers/${customerId}/cards`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
