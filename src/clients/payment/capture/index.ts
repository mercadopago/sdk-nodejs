import { RestClient } from '@utils/restClient';
import type { PaymentResponse } from '../commonTypes';
import type { PaymentCaptureClient } from './types';

export default function capture({ id, transaction_amount, config }: PaymentCaptureClient): Promise<PaymentResponse>  {
	const captureBody = {
		capture: true,
		transaction_amount
	};

	return RestClient.fetch<PaymentResponse>(
		`/v1/payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(captureBody),
			...config.options
		}
	);
}
