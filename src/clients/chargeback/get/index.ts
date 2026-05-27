/**
 * Get chargeback operation.
 *
 * Sends a `GET /v1/chargebacks/:id` request.
 *
 * @module chargeback/get
 */
import { RestClient } from '@utils/restClient';
import type { ChargebackGetClient } from './types';
import type { ChargebackResponse } from '../commonTypes';

export default function get({ id, config }: ChargebackGetClient): Promise<ChargebackResponse> {
	return RestClient.fetch<ChargebackResponse>(
		`/v1/chargebacks/${id}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
