/**
 * Implementation of the "create subscription" operation.
 *
 * Sends a POST to `/preapproval/` and returns the newly created
 * subscription, including the `init_point` authorization URL.
 *
 * @module clients/preApproval/create
 */

import { RestClient } from '@utils/restClient';

import type { PreApprovalCreateClient } from './types';
import type { PreApprovalResponse } from '@src/clients/preApproval/commonTypes';

/**
 * Create a new recurring subscription via the MercadoPago API.
 *
 * @returns The created subscription with its server-assigned `id` and `init_point`.
 */
export default function create({ body, config }: PreApprovalCreateClient): Promise<PreApprovalResponse> {
	return RestClient.fetch<PreApprovalResponse>(
		'/preapproval/',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
