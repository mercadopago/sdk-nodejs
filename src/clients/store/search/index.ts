/**
 * Implementation of the search-stores operation.
 *
 * Sends a `GET /users/{user_id}/stores/search` request to query the
 * stores associated with a user (seller) account.
 *
 * @module store/search
 */

import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { StoreSearchClient, StoreSearchData, StoreSearchResultsPage } from './types';

/**
 * Search the stores of a user via `GET /users/{user_id}/stores/search`.
 *
 * @returns A paginated page of stores matching the criteria.
 */
export default function search({ userId, options, config }: StoreSearchClient & StoreSearchData): Promise<StoreSearchResultsPage> {
	return RestClient.fetch<StoreSearchResultsPage>(
		`/users/${encodePathParam(userId)}/stores/search`,
		{
			method: 'GET',
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
