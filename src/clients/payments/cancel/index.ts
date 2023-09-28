import { RestClient } from '@utils/restClient';

import type { PaymentsResponse } from '../commonTypes';
import type { PaymentCancelClient } from './types';

export default function cancel({ id, config }: PaymentCancelClient): Promise<PaymentsResponse>  {
	const cancelBody = {
		status: 'cancelled'
	};
	return RestClient.fetch<PaymentsResponse>(
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
