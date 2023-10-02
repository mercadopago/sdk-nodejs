import { RestClient } from '@utils/restClient';

import type { CustomerCardListClient } from './types';
import type { CustomerCardResponse } from '../commonTypes';

export default function list({ customerId, config }: CustomerCardListClient): Promise<CustomerCardResponse[]> {
	return RestClient.fetch<CustomerCardResponse[]>(
		`/v1/customers/${customerId}/cards`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
