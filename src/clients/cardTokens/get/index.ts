import { RestClient } from '@utils/restClient';

import type { CardTokenGetClient } from './types';
import type { CardTokenResponse } from '../commonTypes';

export default function get({ id, config }: CardTokenGetClient): Promise<CardTokenResponse> {
	return RestClient.fetch<CardTokenResponse>(
		`/v1/card_tokens/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
