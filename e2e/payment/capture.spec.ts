import MercadoPago, { Payment } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';
import { createCardToken } from '@src/mocks/createCardToken';

describe('IT, capture', () => {
	test('should capture, return partial transaction_amount passed at the request and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const payment = new Payment(client);

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
				capture: false,
			}
		};
		const paymentCreate = await payment.create(paymentBody);
		expect(paymentCreate).toHaveProperty('id');

		const captureResponse = await payment.capture({ id: paymentCreate.id, transaction_amount: 40 });
		expect(captureResponse).toHaveProperty('id', paymentCreate.id);
		expect(captureResponse).toHaveProperty('transaction_amount', 40);
		expect(captureResponse).toEqual(expect.objectContaining({
			acquirer_reconciliation: expect.any(Array),
			additional_info: expect.any(Object),
			binary_mode: expect.any(Boolean),
			build_version: expect.any(String),
			captured: expect.any(Boolean),
			card: expect.any(Object),
			charges_details: expect.any(Array),
			collector_id: expect.any(Number),
			coupon_amount: expect.any(Number),
			currency_id: expect.any(String),
			date_created: expect.any(String),
			date_last_updated: expect.any(String),
			fee_details: expect.any(Array),
			id: expect.any(Number),
			installments: expect.any(Number),
			issuer_id: expect.any(String),
			live_mode: expect.any(Boolean),
			metadata: expect.any(Object),
			money_release_status: expect.any(String),
			operation_type: expect.any(String),
			order: expect.any(Object),
			payer: expect.any(Object),
			payment_method: expect.any(Object),
			payment_method_id: expect.any(String),
			payment_type_id: expect.any(String),
			point_of_interaction: expect.any(Object),
			processing_mode: expect.any(String),
			refunds: expect.any(Array),
			shipping_amount: expect.any(Number),
			status: expect.any(String),
			status_detail: expect.any(String),
			taxes_amount: expect.any(Number),
			transaction_amount: expect.any(Number),
			transaction_amount_refunded: expect.any(Number),
		}));
	});

	test('should capture without transaction_amount, return total transaction_amount and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const payment = new Payment(client);

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
				capture: false,
			}
		};
		const paymentCreate = await payment.create(paymentBody);
		expect(paymentCreate).toHaveProperty('id');

		const captureResponse = await payment.capture({ id: paymentCreate.id });
		expect(captureResponse).toHaveProperty('id', paymentCreate.id);
		expect(captureResponse).toHaveProperty('transaction_amount', 110);
		expect(captureResponse).toEqual(expect.objectContaining({
			acquirer_reconciliation: expect.any(Array),
			additional_info: expect.any(Object),
			binary_mode: expect.any(Boolean),
			build_version: expect.any(String),
			captured: expect.any(Boolean),
			card: expect.any(Object),
			charges_details: expect.any(Array),
			collector_id: expect.any(Number),
			coupon_amount: expect.any(Number),
			currency_id: expect.any(String),
			date_created: expect.any(String),
			date_last_updated: expect.any(String),
			fee_details: expect.any(Array),
			id: expect.any(Number),
			installments: expect.any(Number),
			issuer_id: expect.any(String),
			live_mode: expect.any(Boolean),
			metadata: expect.any(Object),
			money_release_status: expect.any(String),
			operation_type: expect.any(String),
			order: expect.any(Object),
			payer: expect.any(Object),
			payment_method: expect.any(Object),
			payment_method_id: expect.any(String),
			payment_type_id: expect.any(String),
			point_of_interaction: expect.any(Object),
			processing_mode: expect.any(String),
			refunds: expect.any(Array),
			shipping_amount: expect.any(Number),
			status: expect.any(String),
			status_detail: expect.any(String),
			taxes_amount: expect.any(Number),
			transaction_amount: expect.any(Number),
			transaction_amount_refunded: expect.any(Number),
		}));
	});
});
