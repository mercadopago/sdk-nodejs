import { RestClient } from '../../../utils/restClient';
import { CardTokenResponse } from '../get/types';
import { CardTokenCreate } from './types';

export default function create({body, config}: CardTokenCreate): Promise<CardTokenResponse> {
	return RestClient.fetch<CardTokenResponse>(
		'card_tokens',
		{
			headers: {
				'Authorization': `${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: "POST",
			...config.options
		}
	);
}
