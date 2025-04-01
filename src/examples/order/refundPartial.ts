/**
 * Mercado Pago Partial Refund Order.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/order/online-payments/refund/post Documentation }.
 */

import { Order } from '@src/clients/order';
import { OrderResponse } from '@src/clients/order/commonTypes';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

async function createOrder(): Promise<OrderResponse> {
	try {
		const orderResponse = await order.create({
			body: {
				type: 'online',
				processing_mode: 'automatic',
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
		return orderResponse;
	} catch (error) {
		console.error('Error creating order:', error);
	}
}

(async () => {
	const createdOrder = await createOrder();
	const id = createdOrder.id;
	const transactionId = createdOrder.transactions.payments[0].id;
	try {
		const refundedOrder = await order.refund({
			id,
			body: {
				transactions: [
					{
						id: transactionId,
						amount: '25.00'
					}
				]
			},
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>',
			}
		});
		console.log('Order refunded successfully:', refundedOrder);
	} catch (error) {
		console.error('Error refunding order:', error);
	}
})();
