import create from '../../src/clients/customers/create';
import remove from '../../src/clients/customers/remove';
import { config } from '../e2e.config.js';
import update from '../../src/clients/customers/update';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Testing customer, update', () => {
	test('shoud pass foward request options from update to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token, options: { timeout: 5000 } });

		const email = createEmailTestUser();
		const body = {
			email: email,
		};

		const createCustomer = await create({ body, config: client });
		expect(createCustomer).toHaveProperty('id');

		const updatedBody = {
			first_name: 'Jhon',
			last_name: 'Doe',
		};

		const updateCustomer = await update({ customerId: createCustomer.id, body: updatedBody, config: client });
		expect(updateCustomer).toHaveProperty('id', createCustomer.id);

		const removeCustomer = await remove({ customerId: createCustomer.id, config: client });
		expect(removeCustomer).toHaveProperty('id', removeCustomer.id);
	});

	function createEmailTestUser() {
		const random = Math.floor(Math.random() * 1000000);
		const email = 'test_user' + random + '@testuser.com';
		return email;
	}
});
