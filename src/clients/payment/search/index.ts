import { RestClient } from '@src/utils/restClient';
import type { PaymentSearch, PaymentSearchClient } from './types';

export default function search({ options, config }: PaymentSearchClient): Promise<PaymentSearch> {
	return RestClient.fetch<PaymentSearch>(
		'/v1/payments/search',
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
