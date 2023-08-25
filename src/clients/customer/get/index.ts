import { RestClient } from '@utils/restClient';
import type { CustomerCardConfigs } from './types';
import type { CustomerCardResponse } from '../commonTypes';

export default function get({ customerId, cardId, config }: CustomerCardConfigs): Promise<CustomerCardResponse> {
	return RestClient.fetch<CustomerCardResponse>(
		`/v1/customers/${customerId}/cards/${cardId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
