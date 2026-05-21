import { RestClient } from '@src/utils/restClient';

import type { PaymentIntentStatusResponse } from '../commonTypes';
import type { PointGetPaymentIntentStatusClient } from './types';

export default function getPaymentIntentStatus({ payment_intent_id, config }: PointGetPaymentIntentStatusClient): Promise<PaymentIntentStatusResponse> {
	return RestClient.fetch<PaymentIntentStatusResponse>(
		`/point/integration-api/payment-intents/${payment_intent_id}/events`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}
