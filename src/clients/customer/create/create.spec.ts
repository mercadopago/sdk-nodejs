import create from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing customer, create', () => {
	test('should pass forward request options from create to RestClient.fetch', async () => {
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

		await create({ body, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/v1/customers', {
			'body': JSON.stringify(body),
			'headers': { 'Authorization': 'Bearer token' },
			'method': 'POST', 'timeout': 5000 });
	});
});
