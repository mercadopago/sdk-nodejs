import search from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Testing payments, search', () => {
	test('should search payments without filters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const searchPayment = await search({ config : client });

		expect(searchPayment).toHaveProperty('results');
		expect(searchPayment).toHaveProperty('paging');
	});

	test('should search payments filtered by external_reference', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });

		const filters = {
			'external_reference': 'test_search_payment'
		};
		const searchPayment = await search({ filters, config : client });

		expect(searchPayment).toHaveProperty('results');
		expect(searchPayment).toHaveProperty('paging');
		expect(searchPayment.results[0].external_reference).toBe('test_search_payment');
	});

});
