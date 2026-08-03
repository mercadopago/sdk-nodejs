/**
 * Implementation of the OAuth token refresh operation.
 *
 * Sends a `POST /oauth/token` request with `grant_type=refresh_token`
 * to obtain a new access token without requiring the seller to re-authorize.
 *
 * @module oAuth/refresh
 */

import { RestClient } from '@utils/restClient';
import type { OAuthRefreshClient } from './types';
import type { OAuthResponse } from '../commonTypes';

/**
 * Refresh an OAuth access token via `POST /oauth/token`.
 *
 * @returns The OAuth response containing the new access token, refresh token, and metadata.
 */
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
