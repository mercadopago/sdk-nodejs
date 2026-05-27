/**
 * Implementation of the customer card retrieval operation.
 *
 * Sends a GET request to `/v1/customers/:id/cards/:card_id` to fetch
 * a single saved card belonging to a customer.
 *
 * @module clients/customerCard/get
 */

import { RestClient } from '@utils/restClient';

import type { CustomerCardGetRemoveClient } from './types';
import type { CustomerCardResponse } from '../commonTypes';

/**
 * Retrieve a specific saved card for a customer.
 *
 * @returns The card record matching the given customer and card IDs.
 */
export default function get({ customerId, cardId, config }: CustomerCardGetRemoveClient): Promise<CustomerCardResponse> {
	return RestClient.fetch<CustomerCardResponse>(
		`/v1/customers/${customerId}/cards/${cardId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
