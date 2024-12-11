import MercadoPago from '@src/index';
import { config } from '../../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';
import { createCardToken } from '@src/mocks/createCardToken';

describe('Update Order transaction integration test', () => {
	test('should update Order transaction', async () => {
		const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });
		const order = new Order(mercadoPagoConfig);
		const { id: cardToken } = await createCardToken(config.access_token);
		const createOrderRequestBody: OrderCreateData = {
			body: {
				type: 'online',
				processing_mode: 'manual',
				total_amount: '100.00',
				external_reference: 'ext_ref_1234',
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
								token: cardToken,
								installments: 1,
							}
						}
					]
				},
			}
		};

		const orderResponse = await order.create(createOrderRequestBody);
		const updatedTransaction = await order.updateTransaction({
			id: orderResponse.id,
			transactionId: orderResponse.transactions.payments[0].id,
			body: {
				payment_method: {
					installments: 3,
				}
			},
		});

		expect(updatedTransaction.payment_method.installments).toBe(3);
	});
});
