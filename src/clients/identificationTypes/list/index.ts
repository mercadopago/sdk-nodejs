import { RestClient } from '@utils/restClient';

import type { IdentificationTypeGet, IdentificationTypeResponse } from './types';

export default function list({ config }: IdentificationTypeGet): Promise<IdentificationTypeResponse[]> {
	return RestClient.fetch<IdentificationTypeResponse[]>(
		'/v1/identification_types',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
