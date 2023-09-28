import type { PaymentsCreateRequest } from '@src/clients/payments/create/types';
import MercadoPago, { Payment } from '@src/index';
import { config } from '../e2e.config';

describe('Testing payments, create', () => {
	test('should create a payment with success', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const payment = new Payment(client);

		const body: PaymentsCreateRequest = {
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

		const response = await payment.create(body);

		expect(response).toHaveProperty('id');
		expect(response).toHaveProperty('transaction_amount', 110.00);
	});
});
