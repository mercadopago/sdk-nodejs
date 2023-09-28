import { RestClient } from '@utils/restClient';

import type { PreferenceSearchClient, PreferenceSearchResponse } from './types';

export default function search({ filters, config }: PreferenceSearchClient): Promise<PreferenceSearchResponse> {
	return RestClient.fetch<PreferenceSearchResponse>(
		'/checkout/preferences/search',
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
