import get from '.';
import create from '../create';
import type { Create } from '../create/types';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Testing payment, get', () => {
	test('shoud get a payment by id', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const body = {
			'additional_info': {
				'items': [
					{
						'id': 'MLB2907679857',
						'title': 'Point Mini',
						'quantity': 1,
						'unit_price': 58.8
					}
				]
			},
			'payer': {
				'email': 'test_user_123@testuser.com',
			},
			'transaction_amount': 110.00,
			'installments': 1,
			'payment_method_id': 'pix'
		};
		const createRequest: Create = {
			body: body,
			config: client
		};
		const request = await create(createRequest);
		const response = await get({ id: String(request.id), config: client });

		expect(response).toHaveProperty('id');
		expect(response.additional_info.items[0]).toHaveProperty('id', 'MLB2907679857');
	});
});
