/**
 * Implementation of the get-user operation.
 *
 * Sends a `GET /users/me` request to retrieve the profile of the
 * user authenticated by the current access token.
 *
 * @module user/get
 */

import { RestClient } from '@utils/restClient';

import type { UserGetClient, UserResponse } from './types';

/**
 * Retrieve the authenticated user's profile via `GET /users/me`.
 *
 * @returns The user profile with personal data, reputation, and account status.
 */
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
