import { RestClient } from '@utils/restClient';

import type { PreferenceUpdateClient } from './types';
import type { PreferenceResponse } from '@src/clients/preferences/commonTypes';

export default function update({ id, updatePreferenceRequest, config }: PreferenceUpdateClient): Promise<PreferenceResponse> {
	return RestClient.fetch<PreferenceResponse>(
		`/checkout/preferences/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatePreferenceRequest),
			...config.options
		}
	);
}
