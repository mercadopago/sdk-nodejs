import MercadoPago, { Payment } from '@src/index';
import { config } from '../e2e.config';

describe('Testing payments, search', () => {
	test('should search payments without filters', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const payment = new Payment(client);

		const searchPayment = await payment.search();

		expect(searchPayment).toHaveProperty('results');
		expect(searchPayment).toHaveProperty('paging');
	});

	test('should search payments filtered by external_reference', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const payment = new Payment(client);

		const options = {
			options: {
				'external_reference': 'test_search_payment'
			}
		};
		const searchPayment = await payment.search(options);

		expect(searchPayment).toHaveProperty('results');
		expect(searchPayment).toHaveProperty('paging');
		expect(searchPayment.results[0].external_reference).toBe('test_search_payment');
	});
});
