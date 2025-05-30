import { RestClient } from '@src/utils/restClient';
import type { ChargebackSearch, ChargebackSearchClient } from './types';

export default function search({ options, config }: ChargebackSearchClient): Promise<ChargebackSearch> {
	return RestClient.fetch<ChargebackSearch>(
		'/v1/chargebacks/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			queryParams: {
				...options
			},
			...config.options
		}
	);
} 