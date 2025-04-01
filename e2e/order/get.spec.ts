import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';

describe('Get Order integration test', () => {
	test('should get an Order by Id', async () => {
		const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });
		const orderClient = new Order(mercadoPagoConfig);
		const body: OrderCreateData = {
			body: {
				type: 'online',
				total_amount: '1000.00',
				external_reference: 'ext_ref_1234',
				transactions: {
					payments: [
						{
							amount: '1000.00',
							payment_method: {
								id: 'pix',
								type: 'bank_transfer',
							},
						},
					],
				},
				payer: {
					email: 'test_1731350184@testuser.com',
				},
			},
		};

		const order = await orderClient.create(body);
		const orderId = order.id;
		const getOrder = await orderClient.get({ id: orderId });

		expect(getOrder.id).toBe(orderId);
		expect(getOrder.type).toBe('online');
		expect(getOrder.total_amount).toBe('1000.00');
		expect(getOrder.external_reference).toBe('ext_ref_1234');
		expect(getOrder.transactions.payments[0].amount).toBe('1000.00');
		expect(getOrder.transactions.payments[0].payment_method.id).toBe('pix');
	});
});
