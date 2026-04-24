/**
 * Implementation of the "update subscription" operation.
 *
 * Sends a PUT to `/preapproval/{id}` with the modified fields
 * and returns the updated subscription resource.
 *
 * @module clients/preApproval/update
 */

import { RestClient } from '@utils/restClient';

import type { PreApprovalUpdateClient, PreApprovalUpdateResponse } from './types';

/**
 * Update an existing subscription (e.g. change status, amount, or card token).
 *
 * @returns The updated subscription resource.
 */
export default function update({ id, body, config }: PreApprovalUpdateClient): Promise<PreApprovalUpdateResponse> {
	return RestClient.fetch<PreApprovalUpdateResponse>(
		`/preapproval/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
