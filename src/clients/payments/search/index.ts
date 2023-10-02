import { RestClient } from '@src/utils/restClient';
import type { PaymentsSearch, PaymentSearchClient } from './types';

export default function search({ options, config }: PaymentSearchClient): Promise<PaymentsSearch> {
	return RestClient.fetch<PaymentsSearch>(
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
