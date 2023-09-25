import { RestClient } from '@utils/restClient';

import type { CustomerResponse } from '../commonTypes';
import type { CustomerDeleteRequest } from './types';

export default function remove({ customerId, config }: CustomerDeleteRequest): Promise<CustomerResponse> {
	return RestClient.fetch<CustomerResponse>(
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
