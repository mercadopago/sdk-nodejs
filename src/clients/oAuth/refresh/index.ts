import { RestClient } from '@utils/restClient';
import type { OAuthRefreshRequest } from './types';
import type { OAuthResponse } from '../commonTypes';

export default function refresh({ oauthRequest, config }: OAuthRefreshRequest): Promise<OAuthResponse> {
	const defaultRequest = {
		...oauthRequest,
		'grant_type': 'refresh_token',
	};
	return RestClient.fetch<OAuthResponse>(
		'/oauth/token',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(defaultRequest),
			...config.options
		}
	);
}
