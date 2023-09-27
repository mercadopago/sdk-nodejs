import get from '.';
import create from '../create';
import remove from '../remove';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Testing customer, get', () => {
	test('shoud pass forward request options from get to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token, options: { timeout: 5000 } });
		const email = createEmailTestUser();

		const body = {
			email: email,
		};

		const createCustomer = await create({ body, config: client });
		expect(createCustomer).toHaveProperty('id');

		const customer = await get({ customerId: createCustomer.id, config: client });

		expect(customer).toHaveProperty('id', createCustomer.id);
		expect(customer).toHaveProperty('email', body.email);


		const removeCustomer = await remove({ customerId: createCustomer.id, config: client });
		expect(removeCustomer).toHaveProperty('id', removeCustomer.id);
	});

	function createEmailTestUser() {
		const random = Math.floor(Math.random() * 1000000);
		const email = 'test_user' + random + '@testuser.com';
		return email;
	}
});
