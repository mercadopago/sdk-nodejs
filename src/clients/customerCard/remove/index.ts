/**
 * Implementation of the customer card removal operation.
 *
 * Sends a DELETE request to `/v1/customers/:id/cards/:card_id` to
 * remove a saved payment card from a customer's wallet.
 *
 * @module clients/customerCard/remove
 */

import { RestClient } from '@utils/restClient';

import type { CustomerCardResponse } from '../commonTypes';
import type { CustomerCardGetRemoveClient } from '../get/types';

/**
 * Remove a saved card from a customer's wallet.
 *
 * @returns The card record that was deleted.
 */
export default function remove({ customerId, cardId, config }: CustomerCardGetRemoveClient): Promise<CustomerCardResponse> {
	return RestClient.fetch<CustomerCardResponse>(
		`/v1/customers/${customerId}/cards/${cardId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			method: 'DELETE',
			...config.options
		}
	);
}
