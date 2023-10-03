import { RestClient } from '@src/utils/restClient';

import type { PaymentIntentResponse } from '../commonTypes';
import type { PointSearchPaymentIntentClient } from './types';

export default function searchPaymentIntent({ payment_intent_id, config }: PointSearchPaymentIntentClient): Promise<PaymentIntentResponse> {
	return RestClient.fetch<PaymentIntentResponse>(
		`/point/integration-api/payment-intents/${payment_intent_id}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}
