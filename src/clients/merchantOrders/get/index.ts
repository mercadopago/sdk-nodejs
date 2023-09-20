import { RestClient } from '@utils/restClient';
import { MerchantOrder } from '../commonTypes';
import type { MerchantOrderGetRequest } from './types';

export default function get({ merchantOrderId, config }: MerchantOrderGetRequest): Promise<MerchantOrder> {
	return RestClient.fetch<MerchantOrder>(
		`/merchant_orders/${merchantOrderId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}

