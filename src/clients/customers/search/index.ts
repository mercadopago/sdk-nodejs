import { RestClient } from '@utils/restClient';

import type { CustomerSearchRequest, CustomerSearchResultsPage } from './types';

export default function search({ filters, config }: CustomerSearchRequest): Promise<CustomerSearchResultsPage> {
	return RestClient.fetch<CustomerSearchResultsPage>(
		'/v1/customers/search',
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
