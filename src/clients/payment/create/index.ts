import { RestClient } from '@src/utils/restClient';
import type { PaymentCreateClient } from './types';
import type { PaymentResponse } from '../commonTypes';

export default function create({ body, config }: PaymentCreateClient): Promise<PaymentResponse> {
	return RestClient.fetch<PaymentResponse>(
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
