import { RestClient } from '@src/utils/restClient';

import type { PointCreatePaymentIntentClient } from './types';
import type { PaymentIntentResponse } from '../commonTypes';

export default function createPaymentIntent({ device_id, request, config }: PointCreatePaymentIntentClient): Promise<PaymentIntentResponse> {
	return RestClient.fetch<PaymentIntentResponse>(
		`/point/integration-api/devices/${device_id}/payment-intents`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(request),
			...config.options,
		}
	);
}
