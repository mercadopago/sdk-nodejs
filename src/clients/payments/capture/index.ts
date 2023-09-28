import { RestClient } from '@utils/restClient';

import type { PaymentsResponse } from '../commonTypes';
import type { PaymentCaptureRequest } from './types';

export default function capture({ id, transaction_amount, config }: PaymentCaptureRequest): Promise<PaymentsResponse>  {
	const captureBody = {
		capture: true,
		transaction_amount
	};

	return RestClient.fetch<PaymentsResponse>(
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
