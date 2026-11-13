/**
 * Implementation of the update-store operation.
 *
 * Sends a `PUT /users/{user_id}/stores/{id}` request to modify an
 * existing store associated with a user (seller) account.
 *
 * @module store/update
 */

import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { StoreUpdateClient, StoreUpdateResponse } from './types';

/**
 * Update an existing store via `PUT /users/{user_id}/stores/{id}`.
 *
 * @returns The updated store information.
 */
export default function update({ userId, storeId, body, config }: StoreUpdateClient): Promise<StoreUpdateResponse> {
	return RestClient.fetch<StoreUpdateResponse>(
		`/users/${encodePathParam(userId)}/stores/${encodePathParam(storeId)}`,
		{
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: 'PUT',
			...config.options
		}
	);
}
