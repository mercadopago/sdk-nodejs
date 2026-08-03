/**
 * Implementation of the list-refunds operation.
 *
 * Sends a `GET /v1/payments/{payment_id}/refunds/` request to retrieve
 * all refunds associated with the specified payment.
 *
 * @module paymentRefund/list
 */

import { RestClient } from '@utils/restClient';

import type { PaymentRefundListClient } from './types';
import type { RefundResponse } from '../commonTypes';

/**
 * List all refunds for the specified payment.
 *
 * @returns An array of refund records for the payment.
 */
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
