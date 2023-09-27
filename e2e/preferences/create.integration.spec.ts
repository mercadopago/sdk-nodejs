import type { PreferenceRequest } from '@src/clients/preferences/commonTypes';
import create from '@src/clients/preferences/create';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { config } from '../e2e.config';

describe('Testing preference, create', () => {
	test('should POST a request with success', async () => {

		const client = new MercadoPagoConfig({  accessToken: config.access_token, options: { timeout: 5000 } });

		const preferenceRequest: PreferenceRequest = {
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
		};

		const response = await create({ preferenceRequest, config : client });

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
					'picture_url': 'https://http2.mlstatic.com/D_NQ_NP_771574-MLB71928087488_092023-F.jpg',
					'title': 'Dummy Title',
					'quantity': 1,
					'unit_price': 10
				}
			],
		);
	});

});
