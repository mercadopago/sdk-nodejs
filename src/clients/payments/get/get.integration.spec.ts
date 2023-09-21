import get from '.';
import create from '../create';
import type { Create } from '../create/types';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Testing create get', () => {
	test('shoud pass foward request options from get to RestClient.get', async () => {
		const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });
		const body = {
			'additional_info': {
				'items': [
					{
						'id': 'MLB2907679857',
						'title': 'Point Mini',
						'description': 'Producto Point para cobros con tarjetas mediante bluetooth',
						'picture_url': 'https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png',
						'category_id': 'electronics',
						'quantity': 1,
						'unit_price': 58.8
					}
				],
				'shipments': {
					'receiver_address': {
						'zip_code': '12312-123',
						'state_name': 'Rio de Janeiro',
						'city_name': 'Buzios',
						'street_name': 'Av das Nacoes Unidas',
						'street_number': 3003
					}
				}
			},
			'payer': {
				'email': 'test_user_123@testuser.com',
			},
			'transaction_amount': 110.00,
			'installments': 1,
			'description': 'Produto',
			'payment_method_id': 'pix'
		};
		const createRequest: Create = {
			body: body,
			config: client
		};
		const request = await create(createRequest);
		const created = String(request.id);
		const response = await get({ id: created, config: client });

		expect(response).toHaveProperty('id');
	});
});
