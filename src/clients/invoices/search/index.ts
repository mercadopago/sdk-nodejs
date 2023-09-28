import { RestClient } from '@utils/restClient';

import type { InvoicesSearchClient, InvoicesSearchResponse } from './types';

export default function search({ filters, config }: InvoicesSearchClient): Promise<InvoicesSearchResponse> {
	return RestClient.fetch<InvoicesSearchResponse>(
		'/authorized_payments/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...filters
			},
			...config.options
		}
	);
}
