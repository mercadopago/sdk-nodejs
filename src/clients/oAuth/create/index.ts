/**
 * Implementation of the OAuth token creation (authorization-code exchange).
 *
 * Sends a `POST /oauth/token` request with `grant_type=authorization_code`
 * to exchange a temporary authorization code for an access/refresh token pair.
 *
 * @module oAuth/create
 */

import { RestClient } from '@utils/restClient';
import type { OAuthCreateClient } from './types';
import type { OAuthResponse } from '../commonTypes';

/**
 * Exchange an authorization code for OAuth tokens via `POST /oauth/token`.
 *
 * @returns The OAuth response containing the new access token, refresh token, and metadata.
 */
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
