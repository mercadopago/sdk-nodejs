import MercadoPago, { Payment } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

describe('IT, cancel', () => {
	test('should cancel Payment and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const payment = new Payment(client);

		const email = createEmailTestUser();

		const paymentBody = {
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
					email,
				},
				transaction_amount: 110.00,
				installments: 1,
				payment_method_id: 'pix',
			}
		};
		const paymentCreate = await payment.create(paymentBody);
		expect(paymentCreate).toHaveProperty('id');

		const cancelation = await payment.cancel({ id: paymentCreate.id });
		expect(cancelation).toHaveProperty('id', paymentCreate.id);
		expect(cancelation).toHaveProperty('status', 'cancelled');
	});
});
