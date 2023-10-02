import { RestClient } from '@utils/restClient';

import type { PreferenceGetClient } from './types';
import type { PreferenceResponse } from '@src/clients/preferences/commonTypes';

export default function get({ id, config }: PreferenceGetClient): Promise<PreferenceResponse> {
	return RestClient.fetch<PreferenceResponse>(
		`/checkout/preferences/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
