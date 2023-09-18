import { RestClient } from '@src/utils/restClient';
import { GetPaymentIntentListResponse } from '../commonTypes';
import { Search } from './types';

export default function getPaymentIntentList({
	filters,
	config,
}: Search): Promise<GetPaymentIntentListResponse> {
	return RestClient.fetch<GetPaymentIntentListResponse>(
		'/point/integration-api/payment-intents/events',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			queryParams: {
				...filters,
			},
			...config.options,
		}
	);
}
