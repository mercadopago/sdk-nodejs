import { RestClient } from '@utils/restClient';

import type { PaymentsResponse } from '../commonTypes';
import type { PaymentGetRequest } from './types';

export default function get({ id, config }: PaymentGetRequest): Promise<PaymentsResponse>  {
	return RestClient.fetch<PaymentsResponse>(
		`/v1/payments/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
