/**
 * Implementation of the "get subscription plan" operation.
 *
 * Sends a GET to `/preapproval_plan/{id}` and returns the full
 * plan resource.
 *
 * @module clients/preApprovalPlan/get
 */

import { RestClient } from '@utils/restClient';

import type { PreApprovalPlanGetClient } from './types';
import type { PreApprovalPlanResponse } from '@src/clients/preApprovalPlan/commonTypes';

/**
 * Retrieve an existing subscription plan by its unique identifier.
 *
 * @returns The full plan resource.
 */
export default function get({ id, config }: PreApprovalPlanGetClient): Promise<PreApprovalPlanResponse> {
	return RestClient.fetch<PreApprovalPlanResponse>(
		`/preapproval_plan/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
