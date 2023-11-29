import MercadoPago, { Payment, PaymentRefund } from '@src/index';
import { config } from '../e2e.config';
import { createCardToken } from '@src/mocks/createCardToken';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';
import type { PaymentRefundCreateData } from '@src/clients/paymentRefund/create/types';
import type { PaymentRefundListData } from '@src/clients/paymentRefund/list/types';

describe('IT refunds, list', () => {
	test('should make a request, return a list and match response object', async () => {
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
								unit_price: 58.8
							}
						]
					},
					payer: {
						email,
					},
					transaction_amount: 110.00,
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

			const requestList: PaymentRefundListData = {
				payment_id: refunded.payment_id,
			};

			const refundList = await refund.list(requestList);
			expect(refundList[0]).toHaveProperty('payment_id', requestList.payment_id);
			expect(Array.isArray(refundList)).toBe(true);
			expect(refundList[0]).toEqual(expect.objectContaining({
				id: expect.any(Number),
				payment_id: expect.any(Number),
				date_created: expect.any(String),
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
			})
			);
		} catch(e) {
			console.error(e);
		}
	}, 10000);
});
