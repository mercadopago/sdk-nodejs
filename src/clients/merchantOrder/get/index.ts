import { RestClient } from '@utils/restClient';

import type { MerchantOrderResponse } from '../commonTypes';
import type { MerchantOrderGetClient } from './types';

export default function get({ merchantOrderId, config }: MerchantOrderGetClient): Promise<MerchantOrderResponse> {
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

