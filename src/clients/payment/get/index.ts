import { RestClient } from '@utils/restClient';
import type { PaymentResponse } from '../commonTypes';
import type { PaymentGetClient } from './types';

export default function get({ id, config }: PaymentGetClient): Promise<PaymentResponse>  {
	return RestClient.fetch<PaymentResponse>(
		`/v1/payments/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
