/**
 * Implementation of the "update preference" operation.
 *
 * Sends a PUT to `/checkout/preferences/{id}` with the modified fields
 * and returns the updated preference resource.
 *
 * @module clients/preference/update
 */

import { RestClient } from '@utils/restClient';

import type { PreferenceUpdateClient } from './types';
import type { PreferenceResponse } from '@src/clients/preference/commonTypes';

/**
 * Update an existing Checkout Pro preference.
 *
 * @returns The updated preference resource.
 */
export default function update({ id, updatePreferenceRequest, config }: PreferenceUpdateClient): Promise<PreferenceResponse> {
	return RestClient.fetch<PreferenceResponse>(
		`/checkout/preferences/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(updatePreferenceRequest),
			...config.options
		}
	);
}
