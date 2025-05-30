import { RestClient } from '@src/utils/restClient';
import type { AdvancedPaymentCaptureClient } from './types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export default function capture({ id, config }: AdvancedPaymentCaptureClient): Promise<AdvancedPaymentResponse> {
	return RestClient.fetch<AdvancedPaymentResponse>(
		`/v1/advanced_payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify({ capture: true }),
			...config.options
		}
	);
} 