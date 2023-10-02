import { RestClient } from '@utils/restClient';

import type { PreApprovalPlanSearchClient, PreApprovalPlanSearchResponse } from './types';

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
