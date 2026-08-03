/**
 * Implementation of the "create subscription plan" operation.
 *
 * Sends a POST to `/preapproval_plan/` and returns the newly created
 * plan template, including the `init_point` subscription URL.
 *
 * @module clients/preApprovalPlan/create
 */

import { RestClient } from '@utils/restClient';

import type { PreApprovalPlanCreateClient } from './types';
import type { PreApprovalPlanResponse } from '@src/clients/preApprovalPlan/commonTypes';

/**
 * Create a new subscription plan template via the MercadoPago API.
 *
 * @returns The created plan with its server-assigned `id` and `init_point`.
 */
export default function create({ body, config }: PreApprovalPlanCreateClient): Promise<PreApprovalPlanResponse> {
	return RestClient.fetch<PreApprovalPlanResponse>(
		'/preapproval_plan/',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
