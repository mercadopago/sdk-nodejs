import { RestClient } from '@src/utils/restClient';
import { CancelPaymentIntentResponse } from '../commonTypes';
import { CancelPaymentIntent } from './types';

export default function cancelPaymentIntent({
	device_id,
	payment_intent_id,
	config,
}: CancelPaymentIntent): Promise<CancelPaymentIntentResponse> {
	return RestClient.fetch<CancelPaymentIntentResponse>(
		`/point/integration-api/devices/${device_id}/payment-intents/${payment_intent_id}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}
