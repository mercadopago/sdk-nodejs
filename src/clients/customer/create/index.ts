import { RestClient } from '@utils/restClient';
import type { CustomerCard } from './types';
import type { CustomerCardResponse } from '../commonTypes';

export default function create({ customerId, body, config }: CustomerCard): Promise<CustomerCardResponse> {
	return RestClient.fetch<CustomerCardResponse>(
		`/v1/customers/${customerId}/cards`,
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
