import { RestClient } from '@utils/restClient';

import type { InvoiceGetClient } from './types';
import type { InvoiceResponse } from '@src/clients/invoice/commonTypes';

export default function get({ id, config }: InvoiceGetClient): Promise<InvoiceResponse> {
	return RestClient.fetch<InvoiceResponse>(
		`/authorized_payments/${id}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
