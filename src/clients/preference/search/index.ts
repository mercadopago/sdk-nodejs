import { RestClient } from '@utils/restClient';

import type { PreferenceSearchClient, PreferenceSearchResponse } from './types';

export default function search({ options, config }: PreferenceSearchClient): Promise<PreferenceSearchResponse> {
	return RestClient.fetch<PreferenceSearchResponse>(
		'/checkout/preferences/search',
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
