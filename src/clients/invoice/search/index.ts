/**
 * Implementation of the search-invoices operation.
 *
 * Sends a `GET /authorized_payments/search` request to query subscription
 * invoices matching the given filter criteria.
 *
 * @module invoice/search
 */

import { RestClient } from '@utils/restClient';

import type { InvoiceSearchClient, InvoiceSearchResponse } from './types';

/**
 * Search subscription invoices with optional filters.
 *
 * @returns A paginated response containing the matched invoices.
 */
export default function search({ options, config }: InvoiceSearchClient): Promise<InvoiceSearchResponse> {
	return RestClient.fetch<InvoiceSearchResponse>(
		'/authorized_payments/search',
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
