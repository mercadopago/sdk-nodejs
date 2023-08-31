import { RestClient } from '@utils/restClient';
import type { Customer } from '../commonTypes';
import type { CustomerUpdateRequest } from './types';

export default function update({ customerId, body, config }: CustomerUpdateRequest): Promise<Customer> {
	return RestClient.fetch<Customer>(
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
