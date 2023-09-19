import { RestClient } from '@utils/restClient';
import type { Search, PreApprovalSearchResponse } from './types';

export default function search({ filters, config }: Search): Promise<PreApprovalSearchResponse> {
	return RestClient.fetch<PreApprovalSearchResponse>(
		'/preapproval/search',
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
