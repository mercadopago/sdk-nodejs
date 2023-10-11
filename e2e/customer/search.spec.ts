import MercadoPago, { Customer } from '@src/index';
import { config } from '../e2e.config';

describe('IT customer, search', () => {
	test('should search a client and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const customer = new Customer(client);

		const customerSearch = await customer.search({ options: { email: 'test_user_309842984u20@testuser.com' } });
		expect(customerSearch).toHaveProperty('results');
		expect(customerSearch.results[0]).toHaveProperty('email', 'test_user_309842984u20@testuser.com');
		expect(customerSearch.results[0]).toEqual(expect.objectContaining({
			id: expect.any(String),
			email: expect.any(String),
			phone: expect.any(Object),
			identification: expect.any(Object),
			address: expect.any(Object),
			date_last_updated: expect.any(String),
		}));
	});
});
