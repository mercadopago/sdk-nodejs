import { RestClient } from '@utils/restClient';

import type { PaymentMethodGet, PaymentMethodResponse } from './types';

export default function get({ config }: PaymentMethodGet): Promise<PaymentMethodResponse[]> {
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
