/**
 * Implementation of the get-store operation.
 *
 * Sends a `GET /stores/{id}` request to retrieve a single store
 * by its unique identifier.
 *
 * @module store/get
 */

import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { StoreGetClient, StoreResponse } from './types';

/**
 * Retrieve a store by its ID via `GET /stores/{id}`.
 *
 * @returns The store information.
 */
export default function get({ storeId, config }: StoreGetClient): Promise<StoreResponse> {
	return RestClient.fetch<StoreResponse>(`/stores/${encodePathParam(storeId)}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${config.accessToken}`
		},
		...config.options
	});
}
