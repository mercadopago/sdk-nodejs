import { RestClient } from '@utils/restClient';
import type { OAuthCreateClient } from './types';
import type { OAuthResponse } from '../commonTypes';

export default function create({ body, config }: OAuthCreateClient): Promise<OAuthResponse> {
	const defaultRequest = {
		...body,
		'grant_type': 'authorization_code',
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
