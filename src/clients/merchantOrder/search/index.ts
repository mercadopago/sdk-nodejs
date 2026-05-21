/**
 * Implementation of the search-merchant-orders operation.
 *
 * Sends a `GET /merchant_orders/search` request to query orders
 * matching the given filter criteria.
 *
 * @module merchantOrder/search
 */

import { RestClient } from '@utils/restClient';

import type { MerchantOrderSearchClient, MerchantOrderSearchResultsPage } from './types';

/**
 * Search merchant orders with optional filters.
 *
 * @returns A paginated page of merchant orders matching the criteria.
 */
export default function search({ options, config }: MerchantOrderSearchClient): Promise<MerchantOrderSearchResultsPage> {
	return RestClient.fetch<MerchantOrderSearchResultsPage>(
		'/merchant_orders/search',
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
