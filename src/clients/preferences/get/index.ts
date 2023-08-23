import { RestClient } from '@utils/restClient';
import type { GetPreference, GetPreferenceResponse } from './types';

export default function get({ id, config }: GetPreference): Promise<GetPreferenceResponse> {
	return RestClient.fetch<GetPreferenceResponse>(
		`/checkout/preferences/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
