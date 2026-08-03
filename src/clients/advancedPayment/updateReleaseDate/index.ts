/**
 * Update-release-date operation for advanced payments.
 *
 * Sends a `POST /v1/advanced_payments/:id/disburses` with the new release
 * date to control when funds become available to the sellers.
 *
 * @module advancedPayment/updateReleaseDate
 */
import { RestClient } from '@utils/restClient';
import type { AdvancedPaymentUpdateReleaseDateClient } from './types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export default function updateReleaseDate({ id, releaseDate, config }: AdvancedPaymentUpdateReleaseDateClient): Promise<AdvancedPaymentResponse> {
	return RestClient.fetch<AdvancedPaymentResponse>(
		`/v1/advanced_payments/${id}/disburses`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify({ money_release_date: releaseDate }),
			...config.options
		}
	);
}
