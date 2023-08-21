import { RestClient } from '../../../utils/restClient';

import type { UpdatePreferenceRequest, UpdatePreferenceResponse } from './types';

export default function update({ id, updatePreferenceRequest, config }: UpdatePreferenceRequest): Promise<UpdatePreferenceResponse> {
	return RestClient.fetch<UpdatePreferenceResponse>(
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
