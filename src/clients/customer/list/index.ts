import { RestClient } from '@utils/restClient';
import type { CustomerCardList } from './types';
import { CustomerCardResponse } from '../create/types';

export default function listAll({ customerId, config }: CustomerCardList): Promise<CustomerCardResponse[]> {
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
