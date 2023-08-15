import { RestClient } from '../../../utils/restClient';
import { CardTokenGet, CardTokenRequest } from './types';

export default function get({id, config}: CardTokenGet): Promise<CardTokenRequest> {
	return RestClient.fetch<CardTokenRequest>(
		`/card_tokens/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
