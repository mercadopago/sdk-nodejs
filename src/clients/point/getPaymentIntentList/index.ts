/**
 * Implementation of the get-payment-intent-list operation.
 *
 * Sends a `GET /point/integration-api/payment-intents/events` request
 * to retrieve lifecycle events for all payment intents.
 *
 * @module point/getPaymentIntentList
 */

import { RestClient } from '@src/utils/restClient';

import type { GetPaymentIntentListResponse } from '../commonTypes';
import type { PointGetPaymentIntentListClient } from './types';

/**
 * Retrieve payment intent events, optionally filtered by date range.
 *
 * @returns A list of payment intent lifecycle events.
 */
export default function getPaymentIntentList({ options, config }: PointGetPaymentIntentListClient): Promise<GetPaymentIntentListResponse> {
	return RestClient.fetch<GetPaymentIntentListResponse>(
		'/point/integration-api/payment-intents/events',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...options,
			},
			...config.options,
		}
	);
}
