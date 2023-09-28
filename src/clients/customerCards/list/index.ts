import { RestClient } from '@utils/restClient';

import type { CustomerCardsListClient } from './types';
import type { CustomerCardResponse } from '../commonTypes';

export default function list({ customerId, config }: CustomerCardsListClient): Promise<CustomerCardResponse[]> {
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
