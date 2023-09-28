import { RestClient } from '@utils/restClient';

import type { PreApprovalSearchClient, PreApprovalSearchResponse } from './types';

export default function search({ filters, config }: PreApprovalSearchClient): Promise<PreApprovalSearchResponse> {
	return RestClient.fetch<PreApprovalSearchResponse>(
		'/preapproval/search',
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
