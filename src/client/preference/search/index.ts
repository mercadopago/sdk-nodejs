import { RestClient } from '../../../utils/restClient';

import type { Search, PreferenceSearchResponse } from './types';

export default function search({ filters, config }: Search): Promise<PreferenceSearchResponse> {
	return RestClient.fetch<PreferenceSearchResponse>(
		`/checkout/preferences/search`,
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
