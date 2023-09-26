import { RestClient } from '@utils/restClient';

import type { CustomerCardResponse } from '../commonTypes';
import type { CustomerCardConfigs } from '../get/types';

export default function remove({ customerId, cardId, config }: CustomerCardConfigs): Promise<CustomerCardResponse> {
	return RestClient.fetch<CustomerCardResponse>(
		`/v1/customers/${customerId}/cards/${cardId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			method: 'DELETE',
			...config.options
		}
	);
}
