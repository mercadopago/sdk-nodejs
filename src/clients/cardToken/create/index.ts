/**
 * Implementation of the create-card-token operation.
 *
 * Sends a `POST /v1/card_tokens` request to tokenize card data and
 * return a single-use token for PCI-compliant payment creation.
 *
 * @module cardToken/create
 */

import { RestClient } from '@utils/restClient';

import type { CardTokenCreateClient } from './types';
import type { CardTokenResponse } from '../commonTypes';

/**
 * Create a card token via `POST /v1/card_tokens`.
 *
 * @returns The card token response containing the token ID and card metadata.
 */
export default function create({ body, config }: CardTokenCreateClient): Promise<CardTokenResponse> {
	return RestClient.fetch<CardTokenResponse>(
		'/v1/card_tokens',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: 'POST',
			...config.options
		}
	);
}
