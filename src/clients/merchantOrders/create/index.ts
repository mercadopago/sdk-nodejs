import { RestClient } from '@utils/restClient';

import type { MerchantOrderCreateRequest } from './types';
import type { MerchantOrderResponse } from '../commonTypes';

export default function create({ body, config }: MerchantOrderCreateRequest): Promise<MerchantOrderResponse> {
	return RestClient.fetch<MerchantOrderResponse>(
		'/merchant_orders',
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

