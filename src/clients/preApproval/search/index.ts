/**
 * Implementation of the "search subscriptions" operation.
 *
 * Sends a GET to `/preapproval/search` with optional query parameters
 * and returns a paginated list of matching subscriptions.
 *
 * @module clients/preApproval/search
 */

import { RestClient } from '@utils/restClient';

import type { PreApprovalSearchClient, PreApprovalSearchResponse } from './types';

/**
 * Search recurring subscriptions using optional filters.
 *
 * @returns A paginated result containing matching subscription records.
 */
export default function search({ options, config }: PreApprovalSearchClient): Promise<PreApprovalSearchResponse> {
	return RestClient.fetch<PreApprovalSearchResponse>(
		'/preapproval/search',
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
