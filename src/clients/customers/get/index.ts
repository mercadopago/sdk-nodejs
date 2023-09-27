import { RestClient } from '@utils/restClient';

import type { CustomerGetRequest } from './types';
import type { CustomerResponse } from '../commonTypes';

export default function get({ customerId, config }: CustomerGetRequest): Promise<CustomerResponse> {
	return RestClient.fetch<CustomerResponse>(
		`/v1/customers/${customerId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
