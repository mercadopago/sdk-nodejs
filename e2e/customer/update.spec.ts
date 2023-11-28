import MercadoPago, { Customer } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

describe('IT customer, update', () => {
	test('should update a customer and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const customer = new Customer(client);

		const email = createEmailTestUser();
		const body = {
			email,
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
		expect(updateCustomer).toHaveProperty('status', 'active');
		expect(createCustomer).toEqual(expect.objectContaining({
			id: expect.any(String),
			email: expect.any(String),
			user_id: expect.any(Number),
			merchant_id: expect.any(Number),
			client_id: expect.any(Number),
			status: expect.any(String),
			phone: expect.any(Object),
			identification: expect.any(Object),
			address: expect.any(Object),
			date_last_updated: expect.any(String),
		}));

		const removeCustomer = await customer.remove({ customerId: createCustomer.id });
		expect(removeCustomer).toHaveProperty('id', removeCustomer.id);
	});
});
