import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import create from '@src/clients/payments/create';
import type { Create } from '@src/clients/payments/create/types';
import { config } from '../e2e.config';

describe('Testing payments, create', () => {
	test('should create a payment with success', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token, options: { timeout: 5000 } });
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
		const request: Create = {
			body: body,
			config: client
		};
		const response = await create(request);

		expect(response).toHaveProperty('id');
		expect(response).toHaveProperty('transaction_amount', 110.00);
	});
});
