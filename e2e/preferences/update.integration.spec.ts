import update from '../../src/clients/preferences/update';
import create from '../../src/clients/preferences/create/index';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { UpdatePreference } from '../../src/clients/preferences/update/types';
import type { PreferenceRequest } from '../../src/clients/preferences/commonTypes';

describe('Testing preference, update', () => {
	test('should make a PUT request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'access_token' });

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
		const request = await create({ preferenceRequest, config : client });
		const id = request.id;

		const updateRequest: UpdatePreference = {
			id: id,
			updatePreferenceRequest: {
				items: [
					{
						'id': '4567',
						'title': 'Dummy Title Update',
						'quantity': 1,
						'unit_price': 10
					}
				],
			},
			config: client,
		};
		const response = await update(updateRequest);
		expect(response).toEqual(expect.objectContaining({
			id: id,
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
