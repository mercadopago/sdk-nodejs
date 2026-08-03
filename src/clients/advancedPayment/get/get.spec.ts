import get from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing advancedPayment, get', () => {
	test('should make a GET request to /v1/advanced_payments/:id with correct headers', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await get({ id: '123', config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments/123',
			expect.objectContaining({
				method: 'GET',
				headers: { 'Authorization': 'Bearer token' }
			})
		);
	});
});
