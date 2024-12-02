import MercadoPago from '@src/index';
import { config } from '../../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';

describe('Create Order transaction integration test', () => {
	test('should create Order transaction', async () => {
		const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });
		const order = new Order(mercadoPagoConfig);
		const createOrderRequestBody: OrderCreateData = {
			body: {
				type: 'online',
				processing_mode: 'manual',
				total_amount: '100.00',
				external_reference: 'ext_ref_1234',
				payer: {
					email: 'test_1731350184@testuser.com'
				}
			}
		};

		const orderResponse = await order.create(createOrderRequestBody);
		const response = await order.createTransaction({
			id: orderResponse.id,
			body: {
				payments: [
					{
						amount: '100.00',
						payment_method: {
							id: 'pix',
							type: 'bank_transfer',
						}
					}
				],
			},
		});

		expect(response.payments[0].id).toBeTruthy();
		expect(response.payments[0].amount).toBe('100.00');
		expect(response.payments[0].payment_method.id).toBe('pix');
		expect(response.payments[0].payment_method.type).toBe('bank_transfer');
	});
});
