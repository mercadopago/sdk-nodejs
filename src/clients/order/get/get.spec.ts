import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import get from './index';
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Get Order', () => {
	test('should get Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JDMS5325ZDWMESRB5G2541BD';
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 200,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			status: '200',
			total_amount: '200.00',
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);
		
		const result = await get({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JDMS5325ZDWMESRB5G2541BD',
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer access_token',
				}
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});

	test('should return Checkout PRO response fields', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = 'ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9';
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 200,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			type: 'online',
			processing_mode: 'manual',
			status: 'created',
			checkout_url: 'https://www.mercadopago.com/checkout/v1/redirect?order_id=ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9',
			client_token: 'eyJhbGciOiJSUzI1NiIs...',
			config: {
				online: {
					auto_return: 'approved',
					retries: {
						allowed: false,
					},
				},
				payment_method: {
					max_installments: 12,
					installments: {
						interest_free: {
							type: 'range',
							values: [2, 6],
						},
					},
				},
			},
		};
		jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await get({ id: orderId, config });

		expect(result.checkout_url).toBe(mockOrderResponse.checkout_url);
		expect(result.client_token).toBe(mockOrderResponse.client_token);
		expect(result.config.online.retries.allowed).toBe(false);
		expect(result.config.payment_method.installments.interest_free.type).toBe('range');
		expect(result.config.payment_method.installments.interest_free.values).toEqual([2, 6]);
	});
});
