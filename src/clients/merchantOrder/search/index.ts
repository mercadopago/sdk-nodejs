import { RestClient } from '@utils/restClient';

import type { MerchantOrderSearchClient, MerchantOrderSearchResultsPage } from './types';

export default function search({ options, config }: MerchantOrderSearchClient): Promise<MerchantOrderSearchResultsPage> {
	return RestClient.fetch<MerchantOrderSearchResultsPage>(
		'/merchant_orders/search',
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
