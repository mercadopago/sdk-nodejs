import { RestClient } from '@src/utils/restClient';
import type { AdvancedPaymentSearchClient, AdvancedPaymentSearch } from './types';

export default function search({ options, config }: AdvancedPaymentSearchClient): Promise<AdvancedPaymentSearch> {
	const searchParams = new URLSearchParams();
	
	if (options) {
		Object.entries(options).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				searchParams.append(key, String(value));
			}
		});
	}

	const query = searchParams.toString();
	const url = query ? `/v1/advanced_payments/search?${query}` : '/v1/advanced_payments/search';

	return RestClient.fetch<AdvancedPaymentSearch>(
		url,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
} 