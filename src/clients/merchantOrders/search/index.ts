import { RestClient } from '@utils/restClient';
import type { MerchantOrderSearchRequest, MerchantOrderSearchResultsPage } from './types';

export default function search({ filters, config }: MerchantOrderSearchRequest): Promise<MerchantOrderSearchResultsPage> {
	return RestClient.fetch<MerchantOrderSearchResultsPage>(
		'/merchant_orders/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			queryParams: {
				...filters
			},
			...config.options
		}
	);
}
