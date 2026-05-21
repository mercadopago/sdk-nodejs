import { RestClient } from '@src/utils/restClient';
import { OrderSearchClient, OrderSearchResponse } from './types';

export default function search({ options, config }: OrderSearchClient): Promise<OrderSearchResponse> {
	const queryParams: Record<string, string | number> = {};

	if (options) {
		for (const [key, value] of Object.entries(options)) {
			if (typeof value !== 'undefined') {
				queryParams[key] = value;
			}
		}
	}

	return RestClient.fetch<OrderSearchResponse>(
		'/v1/orders',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams,
			...config.options
		}
	);
}
