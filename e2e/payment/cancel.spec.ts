import MercadoPago, { Payment } from '@src/index';
import { config } from '../e2e.config';
import type { PaymentCreateData } from '@src/clients/payment/create/types';

describe('IT, cancel', () => {
	test('should cancel Payment and match response object ', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const payment = new Payment(client);

		const paymentBody = createPayment();
		const paymentCreate = await payment.create(paymentBody);
		expect(paymentCreate).toHaveProperty('id');

		const cancelation = await payment.cancel({ id: paymentCreate.id });
		expect(cancelation).toHaveProperty('id', paymentCreate.id);
		expect(cancelation).toHaveProperty('status', 'cancelled');
	});

	function createPayment(): PaymentCreateData {
		const body = {
			body: {
				additional_info: {
					items: [
						{
							id: 'MLB2907679857',
							title: 'Point Mini',
							quantity: 1,
							unit_price: 58.8
						}
					]
				},
				payer: {
					email: 'test_user_123@testuser.com',
				},
				transaction_amount: 110.00,
				installments: 1,
				payment_method_id: 'pix',
			}
		};
		return body;
	}
});
