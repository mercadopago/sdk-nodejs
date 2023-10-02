import { RestClient } from '@utils/restClient';

import type { CardTokenCreateClient } from './types';
import type { CardTokenResponse } from '../commonTypes';

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
