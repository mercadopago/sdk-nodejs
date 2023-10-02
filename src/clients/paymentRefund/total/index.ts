import { RestClient } from '@utils/restClient';

import type { RefundResponse } from '../commonTypes';
import type { PaymentsRefundTotalClient } from './types';

export default function total({ payment_id, config }: PaymentsRefundTotalClient): Promise<RefundResponse> {
	return RestClient.fetch<RefundResponse>(
		`/v1/payments/${payment_id}/refunds`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify({}),
			...config.options
		}
	);
}
