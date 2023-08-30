import getList from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { GetRefundByPaymentId } from './types';

jest.mock('@utils/restClient');

describe('Testing payments refunds, getList', () => {
	test('should find a refund by payment_id ', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const request: GetRefundByPaymentId = {
			payment_id: '123',
			config: client,
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token'
		};

		await getList(request);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/v1/payments/${request.payment_id}/refunds/`,
			expect.objectContaining({
				headers: expectedHeaders,
			})
		);

	});
});
