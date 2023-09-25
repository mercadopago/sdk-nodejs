import { RestClient } from '@utils/restClient';

import type { CustomerCreateRequest } from './types';
import type { CustomerResponse } from '../commonTypes';

export default function create({ body, config }: CustomerCreateRequest): Promise<CustomerResponse> {
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
