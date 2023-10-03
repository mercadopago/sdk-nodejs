import MercadoPago, { Customer } from '@src/index';
import { config } from '../e2e.config';

describe('IT customer, update', () => {
	test('should update a customer with success', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const customer = new Customer(client);

		const email = createEmailTestUser();
		const body = {
			email: email,
		};

		const createCustomer = await customer.create({ body });
		expect(createCustomer).toHaveProperty('id');

		const updatedBody = {
			first_name: 'Jhon',
			last_name: 'Doe',
		};

		const updateCustomer = await customer.update({ customerId: createCustomer.id, body: updatedBody });
		expect(updateCustomer).toHaveProperty('id', createCustomer.id);
		expect(updateCustomer).toHaveProperty('first_name', 'Jhon');
		expect(updateCustomer).toHaveProperty('last_name', 'Doe');

		const removeCustomer = await customer.remove({ customerId: createCustomer.id });
		expect(removeCustomer).toHaveProperty('id', removeCustomer.id);
	});

	function createEmailTestUser() {
		const random = Math.floor(Math.random() * 1000000);
		const email = 'test_user' + random + '@testuser.com';
		return email;
	}
});
