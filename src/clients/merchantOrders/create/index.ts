import { RestClient } from '@utils/restClient';
import type { MerchantOrderCreateRequest } from './types';
import type { MerchantOrder } from '../commonTypes';

export default function create({ body, config }: MerchantOrderCreateRequest): Promise<MerchantOrder> {
	return RestClient.fetch<MerchantOrder>(
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

