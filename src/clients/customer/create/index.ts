/**
 * Implementation of the customer creation operation.
 *
 * Sends a POST request to `/v1/customers` to register a new customer
 * in MercadoPago.
 *
 * @module clients/customer/create
 */

import { RestClient } from '@utils/restClient';

import type { CustomerCreateClient } from './types';
import type { CustomerResponse } from '../commonTypes';

/**
 * Create a new customer via the MercadoPago API.
 *
 * @returns The newly created customer record.
 */
export default function create({ body, config }: CustomerCreateClient): Promise<CustomerResponse> {
	return RestClient.fetch<CustomerResponse>(
		'/v1/customers',
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
