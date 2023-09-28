import { RestClient } from '@utils/restClient';

import type { PaymentsRefoundsCreateClient } from './types';
import type { RefundResponse } from '../commonTypes';

export default function create({ payment_id, body, config }: PaymentsRefoundsCreateClient): Promise<RefundResponse> {
	return RestClient.fetch<RefundResponse>(
		`/v1/payments/${payment_id}/refunds`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
