import type { PreferenceCreateData } from '@src/clients/preference/create/types';
import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Preference IT, get', () => {
	test('should get preference with success', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const preference = new Preference(client);

		const preferenceRequest: PreferenceCreateData = {
			body: {
				items: [
					{
						'id': '4567',
						'title': 'Dummy Title Create',
						'quantity': 1,
						'unit_price': 10
					}
				], }
		};
		const request = await preference.create(preferenceRequest);

		const response = await preference.get({ preferenceId: request.id });
		expect(response).toHaveProperty('id', request.id);
		expect(response).toHaveProperty('items',
			[
				{
					'id': '4567',
					'category_id': '',
					'currency_id': 'BRL',
					'description': '',
					'title': 'Dummy Title Create',
					'quantity': 1,
					'unit_price': 10
				}
			]);
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
