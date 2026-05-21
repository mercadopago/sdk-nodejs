import { RestClient } from '@utils/restClient';

import type { CustomerSearchClient, CustomerSearchResultsPage } from './types';

export default function search({ options, config }: CustomerSearchClient): Promise<CustomerSearchResultsPage> {
	return RestClient.fetch<CustomerSearchResultsPage>(
		'/v1/customers/search',
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
