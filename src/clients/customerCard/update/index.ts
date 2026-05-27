/**
 * Implementation of the customer card update operation.
 *
 * Sends a PUT request to `/v1/customers/:id/cards/:card_id` to modify
 * an existing saved card (e.g. expiration date or cardholder details).
 *
 * @module clients/customerCard/update
 */

import { RestClient } from '@utils/restClient';

import type { CustomerCardResponse } from '../commonTypes';
import type { CustomerCardUpdateClient } from './types';

/**
 * Update an existing saved card for a customer.
 *
 * @returns The updated card record.
 */
export default function update({ customerId, cardId, body, config }: CustomerCardUpdateClient): Promise<CustomerCardResponse> {
	return RestClient.fetch<CustomerCardResponse>(
		`/v1/customers/${customerId}/cards/${cardId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: 'PUT',
			...config.options
		}
	);
}
