import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';
import type { PreferenceCreateData } from '@src/clients/preference/create/types';
import type { PreferenceUpdateData } from '@src/clients/preference/update/types';

describe('Preference IT, update', () => {
	test('should update request and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const preference = new Preference(client);

		const preferenceRequest: PreferenceCreateData = {
			body: {
				items: [
					{
						id: '4567',
						title: 'Dummy Title Create',
						quantity: 1,
						unit_price: 10
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
						id: '4567',
						title: 'Dummy Title Update',
						quantity: 1,
						unit_price: 10
					}
				],
			}
		};
		const response = await preference.update(updateRequest);

		expect(response).toEqual(expect.objectContaining({
			id: request.id,
		}));
		expect(response.items[0].title).toBe(updateRequest.updatePreferenceRequest.items[0].title);
		expect(response).toEqual(expect.objectContaining({
			init_point: expect.any(String),
			client_id: expect.any(String),
			collector_id: expect.any(Number),
			date_created: expect.any(String),
			id: expect.any(String),
			sandbox_init_point: expect.any(String),
			site_id: expect.any(String),
		}));
		expect(response.items[0]).toEqual(expect.objectContaining({
			id: expect.any(String),
			category_id: expect.any(String),
			currency_id: expect.any(String),
			description: expect.any(String),
			title: expect.any(String),
			quantity: expect.any(Number),
			unit_price: expect.any(Number),
		}));
	});

});
