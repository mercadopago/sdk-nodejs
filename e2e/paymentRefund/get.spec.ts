import MercadoPago, { Payment, PaymentRefund } from '@src/index';
import { config } from '../e2e.config';
import { createCardToken } from '@src/mocks/createCardToken';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';
import type { PaymentRefundGetData } from '@src/clients/paymentRefund/get/types';
import type { PaymentRefundCreateData } from '@src/clients/paymentRefund/create/types';

describe('IT refunds, get', () => {
	test('should make a request and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const refund = new PaymentRefund(client);
		const payment = new Payment(client);
		try {
			const cardToken = await createCardToken(client.accessToken);
			expect(cardToken).toHaveProperty('id');

			const email = createEmailTestUser();

			const paymentBody = {
				body: {
					additional_info: {
						items: [
							{
								id: 'MLB2907679857',
								title: 'Point Mini',
								quantity: 1,
								unit_price: 70
							}
						]
					},
					payer: {
						email,
					},
					transaction_amount: 140.00,
					installments: 1,
					token: cardToken.id,
					payment_method_id: 'master',
				}
			};
			const createdPayment = await payment.create(paymentBody);
			expect(createdPayment).toHaveProperty('id');

			const requestRefund: PaymentRefundCreateData = {
				payment_id: createdPayment.id,
				body: {
					amount: 5
				},
			};
			const refunded = await refund.create(requestRefund);
			expect(refunded).toHaveProperty('id');

			const requestRefundGet: PaymentRefundGetData = {
				payment_id: refunded.payment_id,
				refund_id: refunded.id,
			};

			const getRefund = await refund.get(requestRefundGet);
			expect(getRefund).toHaveProperty('id');
			expect(getRefund).toHaveProperty('payment_id', requestRefundGet.payment_id);
			expect(getRefund).toHaveProperty('id', requestRefundGet.refund_id);
			expect(getRefund).toEqual(expect.objectContaining({
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
		} catch (e) {
			console.error(e);
		}
	}, 10000);
});
