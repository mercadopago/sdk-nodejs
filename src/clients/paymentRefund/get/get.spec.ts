import get from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PaymentRefundGetClient } from './types';

jest.mock('@utils/restClient');

describe('Testing payments refunds, get', () => {
	test('should include the refund_id in the path of the url ', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const request: PaymentRefundGetClient = {
			payment_id: '123',
			refund_id: '456',
			config: client,
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token'
		};

		await get(request);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/v1/payments/${request.payment_id}/refunds/${request.refund_id}`,
			expect.objectContaining({
				headers: expectedHeaders,
			})
		);

	});
});
