import { RestClient } from '@utils/restClient';
import type { GetInvoicesRequest } from './types';
import type { InvoicesResponse } from '@src/clients/invoices/commonTypes';

export default function get({ id, config }: GetInvoicesRequest): Promise<InvoicesResponse> {
	return RestClient.fetch<InvoicesResponse>(
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
