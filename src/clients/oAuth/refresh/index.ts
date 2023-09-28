import { RestClient } from '@utils/restClient';
import type { OAuthRefreshClient } from './types';
import type { OAuthResponse } from '../commonTypes';

export default function refresh({ body, config }: OAuthRefreshClient): Promise<OAuthResponse> {
	const defaultRequest = {
		...body,
		'grant_type': 'refresh_token',
	};
	return RestClient.fetch<OAuthResponse>(
		'/oauth/token',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(defaultRequest),
			...config.options
		}
	);
}
