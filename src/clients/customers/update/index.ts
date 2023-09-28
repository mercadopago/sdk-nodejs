import { RestClient } from '@utils/restClient';

import type { CustomerResponse } from '../commonTypes';
import type { CustomerUpdateClient } from './types';

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
