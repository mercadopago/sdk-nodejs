import type { PreferenceRequest } from '@src/clients/preferences/commonTypes';
import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Preference IT, get', () => {
	test('should GET preference with success', async () => {
		const client = new MercadoPago({  accessToken: config.access_token, options: { timeout: 5000 } });
		const preference = new Preference(client);

		const preferenceRequest: PreferenceRequest = {
			items: [
				{
					'id': '4567',
					'title': 'Dummy Title Create',
					'quantity': 1,
					'unit_price': 10
				}
			],
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
		}));
	});

});
