import { RestClient } from '@utils/restClient';
import type { PaymentCapture } from './types';
import type { PaymentsResponse } from '../../payments/commonTypes';

export default function capture({ id,  body, config }: PaymentCapture): Promise<PaymentsResponse>  {
	const updateBody = {
		...body,
		capture: true
	};

	return RestClient.fetch<PaymentsResponse>(
		`/v1/payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateBody),
			...config.options
		}
	);
}
