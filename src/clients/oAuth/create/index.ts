import { RestClient } from '@utils/restClient';
import type { CreateOAuthRequest } from './types';
import type { OAuthResponse } from '../commonTypes';

export default function create({ oauthRequest, config }: CreateOAuthRequest): Promise<OAuthResponse> {
	const defaultRequest = {
		...oauthRequest,
		'grant_type': 'authorization_code',
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
