import { RestClient } from '@utils/restClient';

import type { PaymentsResponse } from '../commonTypes';
import type { PaymentCaptureClient } from './types';

export default function capture({ id, transaction_amount, config }: PaymentCaptureClient): Promise<PaymentsResponse>  {
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
