import { RestClient } from '@utils/restClient';

import type { PreApprovalPlansGetClient } from './types';
import type { PreApprovalPlanResponse } from '@src/clients/preApprovalPlan/commonTypes';

export default function get({ id, config }: PreApprovalPlansGetClient): Promise<PreApprovalPlanResponse> {
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
