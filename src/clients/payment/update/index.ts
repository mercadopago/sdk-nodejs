import { RestClient } from '@utils/restClient';
import type { PaymentResponse } from '../commonTypes';
import type { PaymentUpdateClient } from './types';

export default function update({ id, body, config }: PaymentUpdateClient): Promise<PaymentResponse> {
	return RestClient.fetch<PaymentResponse>(
		`/v1/payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
} 