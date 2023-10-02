import list from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PaymentRefundListClient } from './types';

jest.mock('@utils/restClient');

describe('Testing payments refunds, list', () => {
	test('should include the payment_id in the path of the url ', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const request: PaymentRefundListClient = {
			payment_id: '123',
			config: client,
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token'
		};

		await list(request);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/v1/payments/${request.payment_id}/refunds/`,
			expect.objectContaining({
				headers: expectedHeaders,
			})
		);

	});
});
