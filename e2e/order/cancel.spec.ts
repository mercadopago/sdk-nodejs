import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';
import { createCardToken } from '@src/mocks/createCardToken';

const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });

function createBodyOrder(token: string): OrderCreateData {
	return {
		body: {
			type: 'online',
			processing_mode: 'automatic',
			capture_mode: 'automatic_async',
			total_amount: '200.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '200.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: token,
							installments: 1
						}
					}
				]
			},
			payer: {
				email: 'test_1731350184@testuser.com'
			},
		}
	};
}

describe('Cancel Order integration test', () => {
	test('should cancel an Order successfully', async () => {
		const cardToken = await createCardToken(config.access_token);
		const token = cardToken.id;
		const body = createBodyOrder(token);

		const orderClient = new Order(mercadoPagoConfig);
		const order = await orderClient.create(body);
		const orderId = order.id;
		const cancelledOrder = await orderClient.cancel({ id: orderId });

		expect(cancelledOrder.id).toBe(orderId);
		expect(cancelledOrder.status).toBe('canceled');
		expect(cancelledOrder.status_detail).toBe('canceled');
		expect(cancelledOrder.transactions.payments[0].amount).toBe('200.00');
		expect(cancelledOrder.transactions.payments[0].status).toBe('canceled');
		expect(cancelledOrder.transactions.payments[0].status_detail).toBe('canceled_transaction');
	}, 10000);
});
