import create from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing disbursementRefund, create', () => {
	test('should make a POST request to /v1/advanced_payments/:id/disbursements/:disbId/refunds', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await create({ advancedPaymentId: '456', disbursementId: '789', body: { amount: 50 }, config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments/456/disbursements/789/refunds',
			expect.objectContaining({
				method: 'POST',
				headers: { 'Authorization': 'Bearer token' }
			})
		);
	});
});
