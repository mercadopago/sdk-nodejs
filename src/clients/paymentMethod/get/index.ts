import { RestClient } from '@utils/restClient';

import type { PaymentMethodGetClient, PaymentMethodResponse } from './types';

export default function get({ config }: PaymentMethodGetClient): Promise<PaymentMethodResponse[]> {
	return RestClient.fetch<PaymentMethodResponse[]>(
		'/v1/payment_methods',
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}
