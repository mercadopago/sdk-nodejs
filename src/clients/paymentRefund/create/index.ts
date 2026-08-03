/**
 * Implementation of the create-refund operation.
 *
 * Sends a `POST /v1/payments/{payment_id}/refunds` request to create a
 * partial refund on the specified payment.
 *
 * @module paymentRefund/create
 */

import { RestClient } from '@utils/restClient';

import type { PaymentRefundCreateClient } from './types';
import type { RefundResponse } from '../commonTypes';

/**
 * Create a partial refund on the specified payment.
 *
 * @returns The newly created refund with its status and amount.
 */
export default function create({ payment_id, body, config }: PaymentRefundCreateClient): Promise<RefundResponse> {
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
