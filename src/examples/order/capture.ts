/**
 * Mercado Pago Process Order.
 *
 * @see {@link [TODO: insert Order documentation URL] Documentation }.
  */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

/**
 * Creates an order and returns its ID.
 * @returns {Promise<string>} 
 */
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

// Create an Order and uses the orderId to Capture an Order
(async () => {
	try {
		const orderId = await createOrder(); 
		const captureResponse = await order.capture({
			id: orderId, 
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>',
			}
		});
		console.log('Order captured successfully:', captureResponse);
	} catch (error) {
		console.error('Error processing order:', error); 
	}
})();