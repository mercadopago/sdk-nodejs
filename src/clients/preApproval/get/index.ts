/**
 * Implementation of the "get subscription" operation.
 *
 * Sends a GET to `/preapproval/{id}` and returns the full
 * subscription resource.
 *
 * @module clients/preApproval/get
 */

import { RestClient } from '@utils/restClient';

import type { PreApprovalGetClient } from './types';
import type { PreApprovalResponse } from '@src/clients/preApproval/commonTypes';

/**
 * Retrieve an existing subscription by its unique identifier.
 *
 * @returns The full subscription resource.
 */
export default function get({ id, config }: PreApprovalGetClient): Promise<PreApprovalResponse> {
	return RestClient.fetch<PreApprovalResponse>(
		`/preapproval/${id}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
