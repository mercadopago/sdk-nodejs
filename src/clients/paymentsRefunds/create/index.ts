import { RestClient } from '@utils/restClient';

import type { CreateRefundRequest } from './types';
import type { RefundResponse } from '../commonTypes';

export default function create({ payment_id, body, config }: CreateRefundRequest): Promise<RefundResponse> {
	return RestClient.fetch<RefundResponse>(
		`/v1/payments/${payment_id}/refunds`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
