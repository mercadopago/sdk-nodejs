import { RestClient } from '@utils/restClient';

import type { InvoiceSearchClient, InvoiceSearchResponse } from './types';

export default function search({ options, config }: InvoiceSearchClient): Promise<InvoiceSearchResponse> {
	return RestClient.fetch<InvoiceSearchResponse>(
		'/authorized_payments/search',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...options
			},
			...config.options
		}
	);
}
