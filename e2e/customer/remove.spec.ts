import MercadoPago, { Customer } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

describe('IT customer, remove', () => {
	test('should delete a customer and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const customer = new Customer(client);

		const email = createEmailTestUser();

		const body = {
			email,
		};

		const createCustomer = await customer.create({ body });
		expect(createCustomer).toHaveProperty('id');

		const customerRemove = await customer.remove({ customerId: createCustomer.id });
		expect(customerRemove).toHaveProperty('id', createCustomer.id);
		expect(customerRemove).toHaveProperty('status', 'deactive');
		expect(customerRemove).toEqual(expect.objectContaining({
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
	});
});
