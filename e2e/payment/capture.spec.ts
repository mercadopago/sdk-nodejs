import type { PaymentCreateData } from '@src/clients/payment/create/types';
import MercadoPago, { Payment } from '@src/index';
import fetch from 'node-fetch';
import { config } from '../e2e.config';

describe('Testing payments, capture', () => {
	test('should capture and return partial transaction_amount passed at the request', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const payment = new Payment(client);

		const cardToken = await createCardToken();
		expect(cardToken).toHaveProperty('id');

		const paymentBody = createPayment(cardToken.id);
		const paymentCreate = await payment.create(paymentBody);
		expect(paymentCreate).toHaveProperty('id');

		const captureResponse = await payment.capture({ id: String(paymentCreate.id), transaction_amount: 40 });
		expect(captureResponse).toHaveProperty('id', paymentCreate.id);
		expect(captureResponse).toHaveProperty('transaction_amount', 40);
	});

	test('should capture without transaction_amount and return total transaction_amount ', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const payment = new Payment(client);

		const cardToken = await createCardToken();
		expect(cardToken).toHaveProperty('id');

		const paymentBody = createPayment(cardToken.id);
		const paymentCreate = await payment.create(paymentBody);
		expect(paymentCreate).toHaveProperty('id');

		const captureResponse = await payment.capture({ id: String(paymentCreate.id) });
		expect(captureResponse).toHaveProperty('id', paymentCreate.id);
		expect(captureResponse).toHaveProperty('transaction_amount', 110);
	});

	function createPayment(token: string): PaymentCreateData {
		const body = {
			body: {
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
				'token': token,
				'capture': false,
			}
		};
		return body;
	}

	async function createCardToken() {
		const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + config.access_token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				card_number: '5031433215406351',
				expiration_year: '2025',
				expiration_month: '11',
				security_code: '123',
				cardholder: {
					identification: {
						type: 'CPF',
						number: '01234567890'
					},
					name: 'APRO'
				}
			})
		});
		return await response.json();
	}
});
