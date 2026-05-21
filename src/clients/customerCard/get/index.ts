import { RestClient } from '@utils/restClient';

import type { CustomerCardGetRemoveClient } from './types';
import type { CustomerCardResponse } from '../commonTypes';

export default function get({ customerId, cardId, config }: CustomerCardGetRemoveClient): Promise<CustomerCardResponse> {
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
