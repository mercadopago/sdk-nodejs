import { RestClient } from '@utils/restClient';

import type { CreatePreApprovalPlanRequest } from './types';
import type { PreApprovalPlanResponse } from '@src/clients/preApprovalPlans/commonTypes';

export default function create({ preApprovalPlanRequest, config }: CreatePreApprovalPlanRequest): Promise<PreApprovalPlanResponse> {
	return RestClient.fetch<PreApprovalPlanResponse>(
		'/preapproval_plan/',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(preApprovalPlanRequest),
			...config.options
		}
	);
}
