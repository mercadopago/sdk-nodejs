import MercadoPago, { Customer } from '@src/index';
import { config } from '../e2e.config';

describe('Testing customer, remove', () => {
	test('should delete a customer with success', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const customer = new Customer(client);

		const email = createEmailTestUser();

		const body = {
			email: email,
		};

		const createCustomer = await customer.create({ body });
		expect(createCustomer).toHaveProperty('id');

		const customerRemove = await customer.remove({ customerId: createCustomer.id });
		expect(customerRemove).toHaveProperty('id', createCustomer.id);
	});

	function createEmailTestUser() {
		const random = Math.floor(Math.random() * 1000000);
		const email = 'test_user' + random + '@testuser.com';
		return email;
	}
});
