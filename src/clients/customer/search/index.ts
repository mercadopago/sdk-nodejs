/**
 * Implementation of the customer search operation.
 *
 * Sends a GET request to `/v1/customers/search` with optional query
 * parameters to find customers matching the given filters.
 *
 * @module clients/customer/search
 */

import { RestClient } from '@utils/restClient';

import type { CustomerSearchClient, CustomerSearchResultsPage } from './types';

/**
 * Search for customers using optional filters and pagination.
 *
 * @returns A paginated page of customer results.
 */
export default function search({ options, config }: CustomerSearchClient): Promise<CustomerSearchResultsPage> {
	return RestClient.fetch<CustomerSearchResultsPage>(
		'/v1/customers/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			queryParams: {
				...options
			},
			...config.options
		}
	);
}
