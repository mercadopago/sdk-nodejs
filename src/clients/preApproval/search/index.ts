import { RestClient } from '@utils/restClient';

import type { PreApprovalSearchClient, PreApprovalSearchResponse } from './types';

export default function search({ options, config }: PreApprovalSearchClient): Promise<PreApprovalSearchResponse> {
	return RestClient.fetch<PreApprovalSearchResponse>(
		'/preapproval/search',
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
