import { RestClient } from '@utils/restClient';
import type { Search, PreApprovalPlanSearchResponse } from './types';

export default function search({ filters, config }: Search): Promise<PreApprovalPlanSearchResponse> {
	return RestClient.fetch<PreApprovalPlanSearchResponse>(
		'/preapproval_plan/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			queryParams: {
				...filters
			},
			...config.options
		}
	);
}
