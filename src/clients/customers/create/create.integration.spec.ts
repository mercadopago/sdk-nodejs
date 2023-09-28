import create from '.';
import remove from '../remove';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
// import { config } from '../../../../e2e/e2e.config.js';

describe('Testing customer, create', () => {
	test('should pass foward request options from create to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token, options: { timeout: 5000 } });

		const email = createEmailTestUser();

		const body = {
			email: email,
		};

		const createCustomer = await create({ body, config: client });
		expect(createCustomer).toHaveProperty('id');

		const removeCustomer = await remove({ customerId: createCustomer.id, config: client });
		expect(removeCustomer).toHaveProperty('id', removeCustomer.id);
	});

	function createEmailTestUser() {
		const random = Math.floor(Math.random() * 1000000);
		const email = 'test_user' + random + '@testuser.com';
		return email;
	}
});