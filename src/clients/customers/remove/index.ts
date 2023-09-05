import { RestClient } from '@utils/restClient';
import type { Customer } from '../commonTypes';
import type { CustomerDeleteRequest } from './types';

export default function remove({ customerId, config }: CustomerDeleteRequest): Promise<Customer> {
	return RestClient.fetch<Customer>(
		`/v1/customers/${customerId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			method: 'DELETE',
			...config.options
		}
	);
}
