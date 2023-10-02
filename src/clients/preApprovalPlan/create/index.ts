import { RestClient } from '@utils/restClient';

import type { PreApprovalPlansCreateClient } from './types';
import type { PreApprovalPlanResponse } from '@src/clients/preApprovalPlan/commonTypes';

export default function create({ body, config }: PreApprovalPlansCreateClient): Promise<PreApprovalPlanResponse> {
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
