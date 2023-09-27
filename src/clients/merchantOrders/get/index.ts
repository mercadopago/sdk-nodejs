import { RestClient } from '@utils/restClient';

import type { MerchantOrderResponse } from '../commonTypes';
import type { MerchantOrderGetRequest } from './types';

export default function get({ merchantOrderId, config }: MerchantOrderGetRequest): Promise<MerchantOrderResponse> {
	return RestClient.fetch<MerchantOrderResponse>(
		`/merchant_orders/${merchantOrderId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}

