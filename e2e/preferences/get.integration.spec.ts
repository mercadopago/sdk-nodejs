import type { PreferenceRequest } from '@src/clients/preferences/commonTypes';
import create from '@src/clients/preferences/create/index';
import get from '@src/clients/preferences/get';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { config } from '../e2e.config';


describe('Preference IT, get', () => {
	test('should GET preference with success', async () => {
		const client = new MercadoPagoConfig({  accessToken: config.access_token, options: { timeout: 5000 } });

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
		const response = await get({ id, config : client });
		expect(response).toHaveProperty('id', id);
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
