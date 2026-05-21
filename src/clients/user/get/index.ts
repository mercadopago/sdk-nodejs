import { RestClient } from '@utils/restClient';

import type { UserGetClient, UserResponse } from './types';

export default function get({ config }: UserGetClient): Promise<UserResponse> {
	return RestClient.fetch<UserResponse>(
		'/users/me',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
