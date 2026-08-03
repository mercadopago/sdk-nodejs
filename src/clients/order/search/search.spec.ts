import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import search from './index';
import { OrderSearchResponse } from './types';

jest.mock('@utils/restClient');

describe('Search Order', () => {
	test('should search orders', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const options = {
			begin_date: '2026-01-01T00:00:00Z',
			end_date: '2026-01-31T23:59:59Z',
			type: 'online',
			page: 1,
		};
		const mockSearchResponse: OrderSearchResponse = {
			data: [
				{
					api_response: {
						status: 200,
						headers: [
							'Content-Type', ['application/json']
						]
					},
					id: 'ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9',
					status: 'created',
					total_amount: '500.00',
				}
			],
			paging: {
				total: '1',
				total_pages: '1',
				offset: '0',
				limit: '10',
			}
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockSearchResponse);

		const result = await search({ options, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer access_token',
				},
				queryParams: options,
			}
		);
		expect(result).toEqual(mockSearchResponse);
	});

	test('should return Checkout PRO response fields in search results', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const mockSearchResponse: OrderSearchResponse = {
			data: [
				{
					api_response: {
						status: 200,
						headers: [
							'Content-Type', ['application/json']
						]
					},
					id: 'ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9',
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
				}
			],
			paging: {
				total: '1',
			}
		};
		jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockSearchResponse);

		const result = await search({ config });
		const order = result.data[0];

		expect(order.checkout_url).toBe(mockSearchResponse.data[0].checkout_url);
		expect(order.client_token).toBe(mockSearchResponse.data[0].client_token);
		expect(order.config.online.retries.allowed).toBe(false);
		expect(order.config.payment_method.installments.interest_free.type).toBe('range');
		expect(order.config.payment_method.installments.interest_free.values).toEqual([2, 6]);
	});
});
