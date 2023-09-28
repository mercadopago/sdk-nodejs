import { RestClient } from '@utils/restClient';

import type { SearchPreApproval, PreApprovalSearchResponse } from './types';

export default function search({ filters, config }: SearchPreApproval): Promise<PreApprovalSearchResponse> {
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
