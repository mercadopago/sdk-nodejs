import { RestClient } from '@utils/restClient';

import type { CustomerCreateClient } from './types';
import type { CustomerResponse } from '../commonTypes';

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
