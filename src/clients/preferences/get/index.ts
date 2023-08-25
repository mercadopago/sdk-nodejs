import { RestClient } from '@utils/restClient';
import type { GetPreference } from './types';
import type { PreferenceResponse } from '@src/clients/preferences/commonTypes';

export default function get({ id, config }: GetPreference): Promise<PreferenceResponse> {
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
