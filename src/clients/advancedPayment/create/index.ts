import { RestClient } from '@src/utils/restClient';
import type { AdvancedPaymentCreateClient } from './types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export default function create({ body, config }: AdvancedPaymentCreateClient): Promise<AdvancedPaymentResponse> {
	return RestClient.fetch<AdvancedPaymentResponse>(
		'/v1/advanced_payments',
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