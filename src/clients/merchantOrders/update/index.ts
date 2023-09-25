import { RestClient } from '@utils/restClient';
import type { MerchantOrderResponse } from '../commonTypes';
import type { MerchantOrderUpdateRequest } from './types';

export default function update({ merchantOrderId, body, config }: MerchantOrderUpdateRequest): Promise<MerchantOrderResponse> {
	return RestClient.fetch<MerchantOrderResponse>(
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

