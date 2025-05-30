import { RestClient } from '@utils/restClient';
import type { CustomerResponse } from '../commonTypes';
import type { CustomerCreateByEmailClient } from './types';

export default function createByEmail({ email, first_name, last_name, config }: CustomerCreateByEmailClient): Promise<CustomerResponse> {
	const body = {
		email,
		...(first_name && { first_name }),
		...(last_name && { last_name })
	};

	return RestClient.fetch<CustomerResponse>(
		'/v1/customers',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
} 