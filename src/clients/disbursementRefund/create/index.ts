/**
 * Create disbursement refund operation.
 *
 * Sends a `POST /v1/advanced_payments/:id/disbursements/:disbursementId/refunds`
 * to refund a specific disbursement by amount.
 *
 * @module disbursementRefund/create
 */
import { RestClient } from '@utils/restClient';
import type { DisbursementRefundCreateClient, DisbursementRefundResponse } from './types';

export default function create({ advancedPaymentId, disbursementId, body, config }: DisbursementRefundCreateClient): Promise<DisbursementRefundResponse> {
	return RestClient.fetch<DisbursementRefundResponse>(
		`/v1/advanced_payments/${advancedPaymentId}/disbursements/${disbursementId}/refunds`,
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
