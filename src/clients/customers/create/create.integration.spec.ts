import create from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
// import { config } from '../../../../e2e/e2e.config.js';

describe('Testing customer, create', () => {
	test('should pass foward request options from create to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const body = {
			email: 'test_user_@doe.com',
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
				zip_code: '01234567',
				street_name: 'Rua Exemplo',
				street_number: 123,
				city: {}
			},
			date_registered: '2021-10-20T11:37:30.000-04:00',
			description: 'Description del user',
			default_card: 'None'
		};

		const createCustomer = await create({ body, config: client });

		expect(createCustomer).toHaveProperty('id');
	});
});
