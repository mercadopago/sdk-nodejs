/**
 * Implementation of the get-refund operation.
 *
 * Sends a `GET /v1/payments/{payment_id}/refunds/{refund_id}` request
 * to retrieve the details of a specific refund.
 *
 * @module paymentRefund/get
 */

import { RestClient } from '@utils/restClient';

import type { PaymentRefundGetClient } from './types';
import type { RefundResponse } from '../commonTypes';

/**
 * Retrieve a specific refund by payment ID and refund ID.
 *
 * @returns The refund details including status, amount, and source.
 */
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
