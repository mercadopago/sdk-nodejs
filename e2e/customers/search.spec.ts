import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import search from '../../src/clients/customers/search';
import type { CustomerSearchOptions } from '../../src/clients/customers/search/types';
import { config } from '../e2e.config.js';

describe('Testing customer, search', () => {
	test('shoud pass foward request options from search to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token, options: { timeout: 5000 } });

		const searchFilters: CustomerSearchOptions = {
			email: 'test_user_309842984u20@testuser.com'
		};

		const customer = await search({ filters: searchFilters, config: client });
		expect(customer).toHaveProperty('results');
		expect(customer.results[0]).toHaveProperty('email', 'test_user_309842984u20@testuser.com');
	});
});
