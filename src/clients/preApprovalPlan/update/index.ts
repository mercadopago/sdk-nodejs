/**
 * Implementation of the "update subscription plan" operation.
 *
 * Sends a PUT to `/preapproval_plan/{id}` with the modified fields
 * and returns the updated plan resource.
 *
 * @module clients/preApprovalPlan/update
 */

import { RestClient } from '@utils/restClient';

import type { UpdatePreApprovalPlanUpdateClient } from './types';
import type { PreApprovalPlanResponse } from '@src/clients/preApprovalPlan/commonTypes';

/**
 * Update an existing subscription plan template.
 *
 * @returns The updated plan resource.
 */
export default function update({ id, updatePreApprovalPlanRequest, config }: UpdatePreApprovalPlanUpdateClient): Promise<PreApprovalPlanResponse> {
	return RestClient.fetch<PreApprovalPlanResponse>(
		`/preapproval_plan/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(updatePreApprovalPlanRequest),
			...config.options
		}
	);
}
