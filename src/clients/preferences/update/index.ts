import { RestClient } from '@utils/restClient';
import type { UpdatePreference } from './types';
import type { PreferenceResponse } from '@src/clients/preferences/commonTypes';

export default function update({ id, updatePreferenceRequest, config }: UpdatePreference): Promise<PreferenceResponse> {
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
