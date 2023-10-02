import { RestClient } from '@utils/restClient';

import type { MerchantOrderCreateClient } from './types';
import type { MerchantOrderResponse } from '../commonTypes';

export default function create({ body, config }: MerchantOrderCreateClient): Promise<MerchantOrderResponse> {
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

