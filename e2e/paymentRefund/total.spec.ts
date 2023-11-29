import MercadoPago, { Payment, PaymentRefund } from '@src/index';
import { config } from '../e2e.config';
import { createCardToken } from '@src/mocks/createCardToken';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';
import type { PaymentCreateData } from '@src/clients/payment/create/types';
import type { PaymentRefundTotalData } from '@src/clients/paymentRefund/total/types';

describe('IT refunds, total', () => {
	test('should make a request, refund total amount and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const refund = new PaymentRefund(client);
		const payment = new Payment(client);
		try {
			const cardToken = await createCardToken(client.accessToken);
			expect(cardToken).toHaveProperty('id');
			const paymentBody = createPayment(cardToken.id);

			const createdPayment = await payment.create(paymentBody);
			expect(createdPayment).toHaveProperty('id');

			const request: PaymentRefundTotalData = {
				payment_id: createdPayment.id,
			};

			const refunded = await refund.total(request);
			expect(refunded).toHaveProperty('id');
			expect(refunded).toHaveProperty('payment_id', request.payment_id);
			expect(refunded).toHaveProperty('amount', 110.00);
			expect(refunded).toEqual(expect.objectContaining({
				payment_id: expect.any(Number),
				date_created: expect.any(String),
				id: expect.any(Number),
				amount: expect.any(Number),
				source: expect.objectContaining({
					id: expect.any(String),
					name: expect.any(String),
					type: expect.any(String),
				}),
				refund_mode: expect.any(String),
				adjustment_amount: expect.any(Number),
				status: expect.any(String),
				amount_refunded_to_payer: expect.any(Number),
			}));
		} catch(e) {
			console.error(e);
		}
	}, 10000);

	const email = createEmailTestUser();

	function createPayment(token: string): PaymentCreateData {
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
					email,
				},
				transaction_amount: 110.00,
				installments: 1,
				token: token,
				payment_method_id: 'master',
			}
		};
		return body;
	}
});
