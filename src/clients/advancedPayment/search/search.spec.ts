import search from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing advancedPayment, search', () => {
	test('should make a GET request to /v1/advanced_payments/search with correct headers', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await search({ config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments/search',
			expect.objectContaining({
				headers: { 'Authorization': 'Bearer token' },
				queryParams: {}
			})
		);
	});
});
