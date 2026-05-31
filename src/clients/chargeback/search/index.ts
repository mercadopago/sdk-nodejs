/**
 * Search chargebacks operation.
 *
 * Sends a `GET /v1/chargebacks/search` request.
 *
 * @module chargeback/search
 */
import { RestClient } from '@utils/restClient';
import type { ChargebackSearchClient, ChargebackSearchResponse } from './types';

export default function search({ options, config }: ChargebackSearchClient): Promise<ChargebackSearchResponse> {
	return RestClient.fetch<ChargebackSearchResponse>(
		'/v1/chargebacks/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...options
			},
			...config.options
		}
	);
}
