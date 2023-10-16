import MercadoPago, { Payment } from '@src/index';
import { config } from '../e2e.config';

describe('IT, search', () => {
	test('should search Payment and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const payment = new Payment(client);

		const searchPayment = await payment.search();

		expect(searchPayment).toHaveProperty('results');
		expect(searchPayment).toHaveProperty('paging');
	});

	test('should search payments with filtered by external_reference', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
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
