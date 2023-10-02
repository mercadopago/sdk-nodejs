import { RestClient } from '@utils/restClient';

import type { PaymentRefundGetClient } from './types';
import type { RefundResponse } from '../commonTypes';

export default function get({ payment_id, refund_id, config }: PaymentRefundGetClient): Promise<RefundResponse> {
	return RestClient.fetch<RefundResponse>(
		`/v1/payments/${payment_id}/refunds/${refund_id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
