import get from '.';
import create from '../create/index';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceRequest } from '../commonTypes';

describe('Preference IT, get', () => {
	test('should GET preference with success', async () => {
		const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });

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
