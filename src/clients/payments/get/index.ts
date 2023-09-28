import { RestClient } from '@utils/restClient';

import type { PaymentsResponse } from '../commonTypes';
import type { PaymentGetClient } from './types';

export default function get({ id, config }: PaymentGetClient): Promise<PaymentsResponse>  {
	return RestClient.fetch<PaymentsResponse>(
		`/v1/payments/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			...config.options
		}
	);
}
