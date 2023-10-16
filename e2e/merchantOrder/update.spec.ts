import { PreferenceCreateData } from '@src/clients/preference/create/types';
import MercadoPago, { MerchantOrder, Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Testing merchantOrder, update', () => {
	test('should update an order and match with declared shape', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const preference = new Preference(client);
		const merchantOrder = new MerchantOrder(client);

		const preferenceRequest: PreferenceCreateData = {
			body: {
				items: [
					{
						id: '4567',
						category_id: 'car_electronics',
						currency_id: 'BRL',
						description: 'Dummy create',
						title: 'Dummy Title',
						quantity: 1,
						unit_price: 10
					}
				],
			}
		};

		const preferenceCreate = await preference.create(preferenceRequest);

		const body = {
			preference_id: preferenceCreate.id,
		};
		const createOrder = await merchantOrder.create({ body });
		expect(createOrder).toHaveProperty('id');

		const updateBody = {
			notification_url: 'https://www.test.com'
		};

		const updateOrder = await merchantOrder.update({ merchantOrderId: createOrder.id, body: updateBody });
		expect(updateOrder.preference_id).toBe(preferenceCreate.id);
		expect(updateOrder.notification_url).toBe(updateBody.notification_url);
		expect(updateOrder).toEqual(expect.objectContaining({
			id: expect.any(Number),
			preference_id: expect.any(String),
			status: expect.any(String),
			site_id: expect.any(String),
			collector: expect.any(Object),
			date_created: expect.any(String),
			last_updated: expect.any(String),
			shipping_cost: expect.any(Number),
			total_amount: expect.any(Number),
			paid_amount: expect.any(Number),
			refunded_amount: expect.any(Number),
			cancelled: expect.any(Boolean),
			order_status: expect.any(String),
			is_test: expect.any(Boolean),
		}));
	});
});
