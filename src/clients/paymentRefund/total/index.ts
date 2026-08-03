/**
 * Implementation of the total-refund operation.
 *
 * Sends a `POST /v1/payments/{payment_id}/refunds` with an empty body
 * to refund the full amount of the specified payment.
 *
 * @module paymentRefund/total
 */

import { RestClient } from '@utils/restClient';

import type { RefundResponse } from '../commonTypes';
import type { PaymentRefundTotalClient } from './types';

/**
 * Create a total (full-amount) refund on the specified payment.
 *
 * @returns The newly created refund covering the full payment amount.
 */
export default function total({ payment_id, config }: PaymentRefundTotalClient): Promise<RefundResponse> {
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
