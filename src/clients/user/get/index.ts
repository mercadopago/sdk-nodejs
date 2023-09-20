import { RestClient } from '@utils/restClient';

import type { UserGet, UserResponse } from './types';

export default function get({ config }: UserGet): Promise<UserResponse[]> {
	return RestClient.fetch<UserResponse[]>(
		'/users/me',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
