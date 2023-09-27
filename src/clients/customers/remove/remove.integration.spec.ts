import remove from '.';
import create from '../create';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Testing customer, remove', () => {
	test('shoud pass foward request options from remove to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token, options: { timeout: 5000 } });
		const email = createEmailTestUser();

		const body = {
			email: email,
		};

		const createCustomer = await create({ body, config: client });
		expect(createCustomer).toHaveProperty('id');

		const customer = await remove({ customerId: createCustomer.id, config: client });
		expect(customer).toHaveProperty('id', createCustomer.id);
	});

	function createEmailTestUser() {
		const random = Math.floor(Math.random() * 1000000);
		const email = 'test_user' + random + '@testuser.com';
		return email;
	}
});
