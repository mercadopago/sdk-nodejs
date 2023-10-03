import { RestClient } from '@src/utils/restClient';

import type { GetPaymentIntentListResponse } from '../commonTypes';
import type { PointGetPaymentIntentListClient } from './types';

export default function getPaymentIntentList({ options, config }: PointGetPaymentIntentListClient): Promise<GetPaymentIntentListResponse> {
	return RestClient.fetch<GetPaymentIntentListResponse>(
		'/point/integration-api/payment-intents/events',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...options,
			},
			...config.options,
		}
	);
}
