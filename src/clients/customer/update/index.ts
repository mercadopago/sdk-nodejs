/**
 * Implementation of the customer update operation.
 *
 * Sends a PUT request to `/v1/customers/:id` to modify an existing
 * customer record in MercadoPago.
 *
 * @module clients/customer/update
 */

import { RestClient } from '@utils/restClient';

import type { CustomerResponse } from '../commonTypes';
import type { CustomerUpdateClient } from './types';

/**
 * Update an existing customer's information.
 *
 * @returns The updated customer record.
 */
export default function update({ customerId, body, config }: CustomerUpdateClient): Promise<CustomerResponse> {
	return RestClient.fetch<CustomerResponse>(
		`/v1/customers/${customerId}`,
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
