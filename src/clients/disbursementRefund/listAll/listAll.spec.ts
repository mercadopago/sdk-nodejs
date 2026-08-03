import listAll from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing disbursementRefund, listAll', () => {
	test('should make a GET request to /v1/advanced_payments/:id/refunds', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await listAll({ advancedPaymentId: '456', config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments/456/refunds',
			expect.objectContaining({
				method: 'GET',
				headers: { 'Authorization': 'Bearer token' }
			})
		);
	});
});
