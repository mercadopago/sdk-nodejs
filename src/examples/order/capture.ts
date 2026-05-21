/**
 * Mercado Pago Capture Order.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/order/online-payments/capture/post Documentation }.
 */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

async function createOrder(): Promise<string> {
	try {
		const orderResponse = await order.create({
			body: {
				type: 'online',
				processing_mode: 'automatic',
				capture_mode: 'automatic_async',
				total_amount: '100.00',
				external_reference: 'ext_ref_1234',
				payer: {
					email: '<PAYER_EMAIL>'
				},
				transactions: {
					payments: [
						{
							amount: '100.00',
							payment_method: {
								id: 'master',
								type: 'credit_card',
								token: '<CARD_TOKEN>',
								installments: 1
							}
						}
					]
				}
			},
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>',
			}
		});
		console.log('Order created successfully:', orderResponse.id);
		return orderResponse.id;
	} catch (error) {
		console.error('Error creating order:', error);
	}
}

(async () => {
	try {
		const orderId = await createOrder();
		const capturedOrder = await order.capture({
			id: orderId,
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>',
			}
		});
		console.log('Order captured successfully:', capturedOrder);
	} catch (error) {
		console.error('Error capturing order:', error);
	}
})();
