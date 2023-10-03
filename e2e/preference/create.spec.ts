import type { PreferenceCreateData } from '@src/clients/preference/create/types';
import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Preference IT, create', () => {
	test('should create a request with success', async () => {

		const client = new MercadoPago({  accessToken: config.access_token, options: { timeout: 5000 } });
		const preference = new Preference(client);

		const preferenceRequest: PreferenceCreateData = {
			body: {
				items: [
					{
						'id': '4567',
						'category_id': 'car_electronics',
						'currency_id': 'BRL',
						'description': 'Dummy create',
						'picture_url': 'https://http2.mlstatic.com/D_NQ_NP_887467-MLA71526269815_092023-F.jpg',
						'title': 'Dummy Title',
						'quantity': 1,
						'unit_price': 10
					}
				],
			}
		};

		const response = await preference.create(preferenceRequest);

		expect(response).toEqual(expect.objectContaining({
			id: expect.any(String),
		}));
		expect(response).toHaveProperty('items',
			[
				{
					'id': '4567',
					'category_id': 'car_electronics',
					'currency_id': 'BRL',
					'description': 'Dummy create',
					'picture_url': 'https://http2.mlstatic.com/D_NQ_NP_847188-MLB72078771649_102023-F.jpg',
					'title': 'Dummy Title',
					'quantity': 1,
					'unit_price': 10
				}
			],
		);
		expect(response).toEqual(expect.objectContaining({
			init_point: expect.any(String),
			client_id: expect.any(String),
			collector_id: expect.any(Number),
			date_created: expect.any(String),
			id: expect.any(String),
			sandbox_init_point: expect.any(String),
			site_id: expect.any(String),
		}));
	});

});
