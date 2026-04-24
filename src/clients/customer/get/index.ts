/**
 * Implementation of the customer retrieval operation.
 *
 * Sends a GET request to `/v1/customers/:id` to fetch a single
 * customer record from MercadoPago.
 *
 * @module clients/customer/get
 */

import { RestClient } from '@utils/restClient';

import type { CustomerGetClient } from './types';
import type { CustomerResponse } from '../commonTypes';

/**
 * Retrieve a customer by its unique identifier.
 *
 * @returns The customer record matching the given ID.
 */
export default function get({ customerId, config }: CustomerGetClient): Promise<CustomerResponse> {
	return RestClient.fetch<CustomerResponse>(
		`/v1/customers/${customerId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
