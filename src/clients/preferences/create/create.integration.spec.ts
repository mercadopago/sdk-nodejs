import create from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceRequest } from '../commonTypes';

describe('Testing preference, create', () => {
	test('should POST a request with success', async () => {

		const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });

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
					'picture_url': 'https://http2.mlstatic.com/D_NQ_NP_861589-MLB71755689720_092023-F.jpg',
					'title': 'Dummy Title',
					'quantity': 1,
					'unit_price': 10
				}
			],
		);
	});

});
