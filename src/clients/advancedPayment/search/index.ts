/**
 * Search advanced-payments operation.
 *
 * Sends a `GET /v1/advanced_payments/search` request.
 *
 * @module advancedPayment/search
 */
import { RestClient } from '@utils/restClient';
import type { AdvancedPaymentSearchClient, AdvancedPaymentSearchResponse } from './types';

export default function search({ options, config }: AdvancedPaymentSearchClient): Promise<AdvancedPaymentSearchResponse> {
	return RestClient.fetch<AdvancedPaymentSearchResponse>(
		'/v1/advanced_payments/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...options
			},
			...config.options
		}
	);
}
