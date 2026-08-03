/**
 * Get-card-token operation.
 *
 * Sends a `GET /v1/card_tokens/:id` request to the MercadoPago API and
 * returns the full {@link CardTokenResponse} for the given token.
 *
 * @module cardToken/get
 */
import { RestClient } from '@utils/restClient';
import type { CardTokenResponse } from '../commonTypes';
import type { CardTokenGetClient } from './types';

/**
 * Retrieve a single card token by its unique identifier.
 *
 * @param id     - Card token identifier to look up.
 * @param config - SDK configuration including the access token.
 * @returns The full card token resource.
 */
export default function get({ id, config }: CardTokenGetClient): Promise<CardTokenResponse> {
	return RestClient.fetch<CardTokenResponse>(
		`/v1/card_tokens/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
