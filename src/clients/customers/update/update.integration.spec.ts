import update from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing customer, update', () => {
	test('shoud pass foward request options from update to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const body = {
			email: 'jhon@doe.com',
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

		const updateCustomer = await update({ customerId: '1491458459-w9QApfdVXikg5u', body, config: client });

		expect(updateCustomer).toHaveProperty('id', '1491458459-w9QApfdVXikg5u');
	});
});
