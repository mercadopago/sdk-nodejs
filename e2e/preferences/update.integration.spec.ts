import type { PreferenceRequest } from '@src/clients/preferences/commonTypes';
import type { UpdatePreferenceRequest } from '@src/clients/preferences/update/types';
import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Testing preference, update', () => {
	test('should make a PUT request with the correct parameters', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
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

		const updateRequest: UpdatePreferenceRequest = {
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
	});
});
