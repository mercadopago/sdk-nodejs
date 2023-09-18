import { RestClient } from '@src/utils/restClient';
import { PaymentIntentResponse } from '../commonTypes';
import { SearchPaymentIntent } from './types';

export default function searchPaymentIntent({
	payment_intent_id,
	config,
}: SearchPaymentIntent): Promise<PaymentIntentResponse> {
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
