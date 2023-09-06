import { RestClient } from '@utils/restClient';
import type { CustomerGetRequest } from './types';
import type { Customer } from '../commonTypes';

export default function get({ customerId, config }: CustomerGetRequest): Promise<Customer> {
	return RestClient.fetch<Customer>(
		`/v1/customers/${customerId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
