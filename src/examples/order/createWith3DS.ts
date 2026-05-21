/**
 * Mercado Pago Create Order with 3DS Authentication.
 *
 * This example demonstrates how to create an order with 3DS (3D Secure) authentication
 * for enhanced security in credit card transactions.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/orders/online-payments/create/post Documentation }.
 */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

order.create({
	body: {
		type: 'online',
		processing_mode: 'automatic',
		capture_mode: 'automatic_async',
		total_amount: '150.00',
		external_reference: '3ds_test',
		config: {
			online: {
				transaction_security: {
					validation: 'on_fraud_risk',
					liability_shift: 'required'
				}
			}
		},
		transactions: {
			payments: [
				{
					amount: '150.00',
					payment_method: {
						id: 'master',
						type: 'credit_card',
						token: '<CARD_TOKEN>',
						installments: 1
					}
				}
			]
		},
		payer: {
			email: '<PAYER_EMAIL>',
			identification: {
				type: 'CPF',
				number: '00000000000'
			}
		}
	},
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	}
}).then((response) => {
	console.log('Order created successfully:', response);
	
	// Check if 3DS challenge is required
	const payment = response.transactions?.payments?.[0];
	if (payment?.status === 'action_required' && payment?.status_detail === 'pending_challenge') {
		const challengeUrl = payment.payment_method?.transaction_security?.url;
		if (challengeUrl) {
			console.log('3DS Challenge required. Challenge URL:', challengeUrl);
			console.log('Display this URL in an iframe to complete the 3DS authentication');
		}
	} else if (payment?.status === 'processed') {
		console.log('Payment approved without 3DS challenge');
	}
}).catch(console.error);
