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

describe('Capture Order integration test', () => {
	test('should capture an Order successfully', async () => {
		const cardToken = await createCardToken(config.access_token);
		const token = cardToken.id;
		const body = createBodyOrder(token);

		const orderClient = new Order(mercadoPagoConfig);
		const order = await orderClient.create(body);
		const orderId = order.id;
		const capturedOrder = await orderClient.capture({ id: orderId });

		expect(capturedOrder.id).toBe(orderId);
		expect(capturedOrder.status).toBe('processed');
		expect(capturedOrder.status_detail).toBe('accredited');
		expect(capturedOrder.transactions.payments[0].amount).toBe('200.00');
		expect(capturedOrder.transactions.payments[0].status).toBe('processed');
		expect(capturedOrder.transactions.payments[0].status_detail).toBe('accredited');
	});
});
