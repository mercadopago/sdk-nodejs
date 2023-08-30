import { RestClient } from '@src/utils/restClient';
import type { PaymentsSearch, Search } from './types';

export default function search({ filters, config }: Search): Promise<PaymentsSearch> {
	return RestClient.fetch<PaymentsSearch>(
		'/v1/payments/search',
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
