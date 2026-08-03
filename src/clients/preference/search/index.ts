/**
 * Implementation of the "search preferences" operation.
 *
 * Sends a GET to `/checkout/preferences/search` with optional query
 * parameters and returns a paginated list of matching preferences.
 *
 * @module clients/preference/search
 */

import { RestClient } from '@utils/restClient';

import type { PreferenceSearchClient, PreferenceSearchResponse } from './types';

/**
 * Search Checkout Pro preferences using optional filters.
 *
 * @returns A paginated result containing matching preference summaries.
 */
export default function search({ options, config }: PreferenceSearchClient): Promise<PreferenceSearchResponse> {
	return RestClient.fetch<PreferenceSearchResponse>(
		'/checkout/preferences/search',
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
