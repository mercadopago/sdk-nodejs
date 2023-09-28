import { RestClient } from '@utils/restClient';

import type { PreApprovalPlansSearchClient, PreApprovalPlanSearchResponse } from './types';

export default function search({ filters, config }: PreApprovalPlansSearchClient): Promise<PreApprovalPlanSearchResponse> {
	return RestClient.fetch<PreApprovalPlanSearchResponse>(
		'/preapproval_plan/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...filters
			},
			...config.options
		}
	);
}
