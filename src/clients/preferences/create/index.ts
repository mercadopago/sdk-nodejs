import { RestClient } from '@utils/restClient';
import type { CreatePreferenceRequest } from './types';
import type { PreferenceResponse } from '@src/clients/preferences/commonTypes';

export default function create({ preferenceRequest, config }: CreatePreferenceRequest): Promise<PreferenceResponse> {
	return RestClient.fetch<PreferenceResponse>(
		'/checkout/preferences/',
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
