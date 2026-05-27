/**
 * Create-all disbursement refunds operation.
 *
 * Sends a `POST /v1/advanced_payments/:id/refunds` to refund all
 * disbursements of an advanced payment at once.
 *
 * @module disbursementRefund/createAll
 */
import { RestClient } from '@utils/restClient';
import type { DisbursementRefundCreateAllClient, DisbursementRefundResponse } from './types';

export default function createAll({ advancedPaymentId, body, config }: DisbursementRefundCreateAllClient): Promise<DisbursementRefundResponse> {
	return RestClient.fetch<DisbursementRefundResponse>(
		`/v1/advanced_payments/${advancedPaymentId}/refunds`,
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
