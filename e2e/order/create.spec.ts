import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';

describe('Create Order integration test', () => {
	test('should create Order', async () => {
		const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });
		const order = new Order(mercadoPagoConfig);
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

		const response = await order.create(body);

		expect(response.id).toBeTruthy();
		expect(response.type).toBe('online');
		expect(response.total_amount).toBe('1000.00');
		expect(response.external_reference).toBe('ext_ref_1234');
		expect(response.transactions.payments[0].amount).toBe('1000.00');
		expect(response.transactions.payments[0].payment_method.id).toBe('pix');
	});
});
