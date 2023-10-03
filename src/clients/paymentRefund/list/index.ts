import { RestClient } from '@utils/restClient';

import type { PaymentRefundListClient } from './types';
import type { RefundResponse } from '../commonTypes';

export default function list({ payment_id, config }: PaymentRefundListClient): Promise<Array<RefundResponse>> {
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
