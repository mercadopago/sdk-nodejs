/**
 * Mercado Pago Update Order transaction.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/order/online-payments/update-transaction/put Documentation }.
 */

import { Order } from '@src/clients/order';
import { OrderResponse } from '@src/clients/order/commonTypes';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

async function createOrder(): Promise<OrderResponse> {
	try {
		const createdOrder = await order.create({
			body: {
				type: 'online',
				processing_mode: 'manual',
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
								installments: 1,
							}
						}
					]
				},
			},
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>'
			}
		});

		console.log('Transaction before update:', createdOrder.transactions.payments[0]);
		return createdOrder;
	} catch (error) {
		console.error('Error creating order:', error);
	}
}

(async () => {
	try {
		const createdOrder = await createOrder();
		const updatedTransaction = await order.updateTransaction({
			id: createdOrder.id,
			transactionId: createdOrder.transactions.payments[0].id,
			body: {
				payment_method: {
					installments: 3,
				}
			},
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>'
			}
		});

		console.log('====================================');
		console.log('Transaction after update:', updatedTransaction);
	} catch (error) {
		console.error('Error updating transaction:', error);
	}
})();
