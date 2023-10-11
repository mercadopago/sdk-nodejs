import MercadoPago, { Payment } from '@src/index';
import { config } from '../e2e.config';
import type { PaymentCreateData } from '@src/clients/payment/create/types';

describe('IT, create', () => {
	test('should create Payment and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const payment = new Payment(client);

		const body: PaymentCreateData = {
			body: {
				additional_info: {
					items: [
						{
							id: 'MLB2907679857',
							title: 'Point Mini',
							quantity: 1,
							unit_price: 58.8
						}
					]
				},
				payer: {
					email: 'test_user_123@testuser.com',
				},
				transaction_amount: 110.00,
				installments: 1,
				payment_method_id: 'pix'
			}
		};

		const response = await payment.create(body);

		expect(response).toHaveProperty('id');
		expect(response.additional_info.items[0]).toEqual(expect.objectContaining({
			id: 'MLB2907679857',
			title: 'Point Mini',
			quantity: '1',
			unit_price: '58.8'
		}));
		expect(response.transaction_amount).toBe(110.00);

		expect(response).toEqual(expect.objectContaining({
			collector_id: expect.any(Number),
			date_created: expect.any(String),
			id: expect.any(Number),
			payment_method_id: expect.any(String),
			payment_type_id: expect.any(String),
			status: expect.any(String),
			status_detail: expect.any(String),
			transaction_amount: expect.any(Number),
			point_of_interaction: expect.objectContaining({
				transaction_data: expect.objectContaining({
					qr_code: expect.any(String),
					qr_code_base64: expect.any(String),
					ticket_url: expect.any(String),
				})
			}),
			payer: expect.objectContaining({
				id: expect.any(String),
			}),
		}));
	});
});

