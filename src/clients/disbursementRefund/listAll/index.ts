/**
 * List-all disbursement refunds operation.
 *
 * Sends a `GET /v1/advanced_payments/:id/refunds` request.
 *
 * @module disbursementRefund/listAll
 */
import { RestClient } from '@utils/restClient';
import type { DisbursementRefundListAllClient, DisbursementRefundListAllResponse } from './types';

export default function listAll({ advancedPaymentId, config }: DisbursementRefundListAllClient): Promise<DisbursementRefundListAllResponse> {
	return RestClient.fetch<DisbursementRefundListAllResponse>(
		`/v1/advanced_payments/${advancedPaymentId}/refunds`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
