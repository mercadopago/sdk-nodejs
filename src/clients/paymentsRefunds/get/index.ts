import { RestClient } from '@utils/restClient';
import type { Get } from './types';
import type { RefundResponse } from '../commonTypes';

export default function get({ payment_id, refund_id, config }: Get): Promise<RefundResponse> {
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
