/**
 * Mercado Pago Cancel Order.
 *
 * @see {@link [TODO: insert Order documentation URL] Documentation }.
  */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

// Creates an order and returns its ID.
async function createOrder(): Promise<string> {
	try {
		const orderResponse = await order.create({
			body: {
				type: 'online',
				processing_mode: 'automatic',
				total_amount: '100.00',
				external_reference: 'ext_ref_1234',
				type_config: {
					capture_mode: 'manual'
				},
				payer: {
					email: 'test_1731350184@testuser.com'
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
		console.log('Order created successfully:', orderResponse);
		return orderResponse.id; 
	} catch (error) {
		console.error('Error creating order:', error);
	}
}

// Create an Order and then Cancel the Order.
(async () => {
	try {
		const orderId = await createOrder(); 
		const cancelledOrder = await order.cancel({
			id: orderId, 
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>',
			}
		});
		console.log('Order cancelled successfully:', cancelledOrder);
	} catch (error) {
		console.error('Error cancelling order:', error); 
	}
})();