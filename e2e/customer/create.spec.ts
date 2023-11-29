import MercadoPago, { Customer } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

describe('IT customer, create', () => {
	test('should create a client and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const customer = new Customer(client);

		const email = createEmailTestUser();

		const body = {
			email,
			first_name: 'Jhon',
			last_name: 'Doe',
			phone: {
				area_code: '55',
				number: '991234567'
			},
			identification: {
				type: 'CPF',
				number: '12345678900'
			},
			default_address: 'Home',
			address: {
				id: '123123',
				zip_code: '25065172',
				street_name: 'Rua Exemplo',
				street_number: 123,
				city: {}
			},
			date_registered: '2023-10-20T11:37:30.000-04:00',
			description: 'Description del user',
			default_card: 'None'
		};

		const createCustomer = await customer.create({ body });
		expect(createCustomer).toHaveProperty('status', 'active');
		expect(createCustomer).toEqual(expect.objectContaining({
			email,
			first_name: 'Jhon',
			last_name: 'Doe',
			date_registered: '2023-10-20T11:37:30.000-04:00',
			description: 'Description del user',
		}));
		expect(createCustomer).toHaveProperty('phone', expect.objectContaining({
			area_code: '55',
			number: '991234567'
		}));
		expect(createCustomer).toHaveProperty('identification', expect.objectContaining({
			type: 'CPF',
			number: '12345678900'
		}));
		expect(createCustomer).toHaveProperty('address', expect.objectContaining({
			zip_code: '25065172',
			street_name: 'Rua Exemplo',
			street_number: 123,
		}));
		expect(createCustomer).toEqual(expect.objectContaining({
			id: expect.any(String),
			email: expect.any(String),
			first_name: expect.any(String),
			last_name: expect.any(String),
			phone: expect.any(Object),
			identification: expect.any(Object),
			default_address: expect.any(String),
			address: expect.any(Object),
			date_registered: expect.any(String),
			date_created: expect.any(String),
			date_last_updated: expect.any(String),
			description: expect.any(String),
			user_id: expect.any(Number),
			merchant_id: expect.any(Number),
			client_id: expect.any(Number),
			status: expect.any(String),
		}));

		const removeCustomer = await customer.remove({ customerId: createCustomer.id });
		expect(removeCustomer).toHaveProperty('id', removeCustomer.id);
	});
});
