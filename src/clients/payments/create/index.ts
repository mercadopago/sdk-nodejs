import { RestClient } from '@src/utils/restClient';
import type { Create } from './types';
import type { PaymentsResponse } from '../commonTypes';

export default function create({ body, config }: Create): Promise<PaymentsResponse> {
	return RestClient.fetch<PaymentsResponse>(
		'/v1/payments',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
