import { RestClient } from '@utils/restClient';
import type { PaymentResponse } from '../commonTypes';
import type { PaymentCancelClient } from './types';

export default function cancel({ id, config }: PaymentCancelClient): Promise<PaymentResponse>  {
	const cancelBody = {
		status: 'cancelled'
	};
	return RestClient.fetch<PaymentResponse>(
		`/v1/payments/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(cancelBody),
			...config.options
		}
	);
}
