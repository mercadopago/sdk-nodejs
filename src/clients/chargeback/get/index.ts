import { RestClient } from '@utils/restClient';
import type { ChargebackResponse } from '../commonTypes';
import type { ChargebackGetClient } from './types';

export default function get({ id, config }: ChargebackGetClient): Promise<ChargebackResponse> {
	return RestClient.fetch<ChargebackResponse>(
		`/v1/chargebacks/${id}`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
} 