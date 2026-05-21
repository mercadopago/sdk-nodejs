import { RestClient } from '@utils/restClient';

import type { PreferenceCreateClient } from './types';
import type { PreferenceResponse } from '@src/clients/preference/commonTypes';

export default function create({ body, config }: PreferenceCreateClient): Promise<PreferenceResponse> {
	return RestClient.fetch<PreferenceResponse>(
		'/checkout/preferences/',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
