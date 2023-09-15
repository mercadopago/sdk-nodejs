import { RestClient } from '@utils/restClient';
import type { UpdatePreApprovalPlan } from './types';
import type { PreApprovalPlanResponse } from '@src/clients/preApprovalPlans/commonTypes';

export default function update({ id, updatePreApprovalPlanRequest, config }: UpdatePreApprovalPlan): Promise<PreApprovalPlanResponse> {
	return RestClient.fetch<PreApprovalPlanResponse>(
		`/preapproval_plan/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatePreApprovalPlanRequest),
			...config.options
		}
	);
}
