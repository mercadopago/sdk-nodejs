/**
 * Implementation of the get-invoice operation.
 *
 * Sends a `GET /authorized_payments/{id}` request to retrieve a single
 * subscription invoice by its unique identifier.
 *
 * @module invoice/get
 */

import { RestClient } from '@utils/restClient';

import type { InvoiceGetClient } from './types';
import type { InvoiceResponse } from '@src/clients/invoice/commonTypes';

/**
 * Retrieve a subscription invoice (authorized payment) by ID.
 *
 * @returns The invoice details including status, amount, and payer information.
 */
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
