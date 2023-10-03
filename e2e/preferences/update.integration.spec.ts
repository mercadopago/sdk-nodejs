import { PreferenceCreateData } from '@src/clients/preference/create/types';
import type { PreferenceUpdateData } from '@src/clients/preference/update/types';
import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Preference IT, update', () => {
	test('should update request with success', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
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
				],
			}
		};
		const request = await preference.create(preferenceRequest);

		const updateRequest: PreferenceUpdateData = {
			id: request.id,
			updatePreferenceRequest: {
				items: [
					{
						'id': '4567',
						'title': 'Dummy Title Update',
						'quantity': 1,
						'unit_price': 10
					}
				],
			}
		};
		const response = await preference.update(updateRequest);

		expect(response).toEqual(expect.objectContaining({
			id: request.id,
		}));
		expect(response).toHaveProperty('items',
			[
				{
					'id': '4567',
					'category_id': '',
					'currency_id': 'BRL',
					'description': '',
					'title': 'Dummy Title Update',
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
