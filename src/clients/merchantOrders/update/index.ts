import { RestClient } from '@utils/restClient';
import type { MerchantOrder } from '../commonTypes';
import type { MerchantOrderUpdateRequest } from './types';

export default function update({ merchantOrderId, body, config }: MerchantOrderUpdateRequest): Promise<MerchantOrder> {
	return RestClient.fetch<MerchantOrder>(
		`/merchant_orders/${merchantOrderId}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: 'PUT',
			...config.options
		}
	);
}

