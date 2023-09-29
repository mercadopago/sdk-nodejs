import { RestClient } from '@utils/restClient';

import type { PaymentsRefundsListClient } from './types';
import type { RefundResponse } from '../commonTypes';

export default function list({ payment_id, config }: PaymentsRefundsListClient): Promise<Array<RefundResponse>> {
	return RestClient.fetch<Array<RefundResponse>>(
		`/v1/payments/${payment_id}/refunds/`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
