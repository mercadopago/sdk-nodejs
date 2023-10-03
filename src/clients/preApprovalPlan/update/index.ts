import { RestClient } from '@utils/restClient';

import type { UpdatePreApprovalPlanUpdateClient } from './types';
import type { PreApprovalPlanResponse } from '@src/clients/preApprovalPlan/commonTypes';

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
