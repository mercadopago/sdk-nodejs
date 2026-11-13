/**
 * Implementation of the create-store operation.
 *
 * Sends a `POST /users/{user_id}/stores` request to create a new
 * store for the given user.
 *
 * @module store/create
 */

import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { StoreCreateClient, StoreCreateData, StoreResponse } from './types';

export type { StoreCreateClient, StoreCreateData };

/**
 * Create a store via `POST /users/{user_id}/stores`.
 *
 * @param params.userId - ID of the user (seller) that will own the store.
 * @returns The created store.
 */
export default function create({
	userId,
	body,
	config
}: StoreCreateClient): Promise<StoreResponse> {
	return RestClient.fetch<StoreResponse>(
		`/users/${encodePathParam(userId)}/stores`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}

