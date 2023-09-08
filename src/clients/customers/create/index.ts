import { RestClient } from '@utils/restClient';
import type { CustomerCreateRequest } from './types';
import type { Customer } from '../commonTypes';

export default function create({ body, config }: CustomerCreateRequest): Promise<Customer> {
	return RestClient.fetch<Customer>(
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
