/**
 * Implementation of the "get preference" operation.
 *
 * Sends a GET to `/checkout/preferences/{id}` and returns the full
 * preference resource.
 *
 * @module clients/preference/get
 */

import { RestClient } from '@utils/restClient';

import type { PreferenceGetClient } from './types';
import type { PreferenceResponse } from '@src/clients/preference/commonTypes';

/**
 * Retrieve an existing Checkout Pro preference by its unique identifier.
 *
 * @returns The full preference resource.
 */
export default function get({ id, config }: PreferenceGetClient): Promise<PreferenceResponse> {
	return RestClient.fetch<PreferenceResponse>(
		`/checkout/preferences/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
