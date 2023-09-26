import cancel from '@src/clients/payments/cancel';
import create from '@src/clients/payments/create';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Create } from '@src/clients/payments/create/types';
import { config } from '../e2e.config';

describe('Testing payments, cancel', () => {
	test('should cancel with success', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token });

		const paymentBody = createPayment(client);
		const payment = await create(paymentBody);
		expect(payment).toHaveProperty('id');

		const cancelation = await cancel({ id: String(payment.id), config : client });
		expect(cancelation).toHaveProperty('id', payment.id);
		expect(cancelation).toHaveProperty('status', 'cancelled');
	});

	function createPayment(client: MercadoPagoConfig): Create {
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
			'payment_method_id': 'pix',
		};
		const request: Create = {
			body: body,
			config: client
		};
		return request;
	}
});
