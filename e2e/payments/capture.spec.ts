import capture from '../../src/clients/payments/capture';
import create from '../../src/clients/payments/create';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Create } from '../../src/clients/payments/create/types';
import fetch from 'node-fetch';
import { config } from '../e2e.config';

describe('Testing payments, capture', () => {
	test('should capture and return partial transaction_amount passed at the request', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token, options: { timeout: 5000 } });

		const cardToken = await createCardToken();
		expect(cardToken).toHaveProperty('id');

		const payment = createPayment(cardToken.id, client);
		const response = await create(payment);
		expect(response).toHaveProperty('id');
		const paymentId = String(response.id);

		const captureResponse = await capture({ id: paymentId, transaction_amount: 40, config: client });
		expect(captureResponse).toHaveProperty('id', Number(paymentId));
		expect(captureResponse).toHaveProperty('transaction_amount', 40);
	});

	test('should capture without transaction_amount and return total transaction_amount ', async () => {
		const client = new MercadoPagoConfig({ accessToken: config.access_token, options: { timeout: 5000 } });

		const cardToken = await createCardToken();
		expect(cardToken).toHaveProperty('id');

		const paymentBody = createPayment(cardToken.id, client);
		const payment = await create(paymentBody);
		expect(payment).toHaveProperty('id');

		const captureResponse = await capture({ id: String(payment.id), config: client });
		expect(captureResponse).toHaveProperty('id', payment.id);
		expect(captureResponse).toHaveProperty('transaction_amount', 110);
	});

	function createPayment(token: string, client: MercadoPagoConfig): Create {
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
			'token': token,
			'capture': false,
		};
		const request: Create = {
			body: body,
			config: client
		};
		return request;
	}

	async function createCardToken() {
		const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + 'access_token',
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
