/**
 * Implementation of the "search subscription plans" operation.
 *
 * Sends a GET to `/preapproval_plan/search` with optional query
 * parameters and returns a paginated list of matching plans.
 *
 * @module clients/preApprovalPlan/search
 */

import { RestClient } from '@utils/restClient';

import type { PreApprovalPlanSearchClient, PreApprovalPlanSearchResponse } from './types';

/**
 * Search subscription plan templates using optional filters.
 *
 * @returns A paginated result containing matching plan records.
 */
export default function search({ options, config }: PreApprovalPlanSearchClient): Promise<PreApprovalPlanSearchResponse> {
	return RestClient.fetch<PreApprovalPlanSearchResponse>(
		'/preapproval_plan/search',
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
