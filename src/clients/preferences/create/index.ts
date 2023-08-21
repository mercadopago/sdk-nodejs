import { RestClient } from '../../../utils/restClient';

import type { CreatePreferenceRequest, CreatePreferenceResponse } from './types';

export default function create({ preferenceRequest, config }: CreatePreferenceRequest): Promise<CreatePreferenceResponse> {
	return RestClient.fetch<CreatePreferenceResponse>(
		`/checkout/preferences/`,
		{
      method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceRequest),
			...config.options
		}
	);
}
