import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { OrderResponse } from '../commonTypes';
import refund from './index';
import { RefundRequest } from './types';

jest.mock('@utils/restClient');

describe('Refund Total Order', () => {
	test('should refund an Order totally', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JE6EZVK4FGMM4AYVQF23K17B';
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 201,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			status: 'refunded',
			status_detail: 'refunded',
			transactions: {
				refunds: [
					{
						id: 'ref_01JE6F05C365ADF8JSJ3W92FJ5',
						transaction_id: 'pay_01JE6EZVK4FGMM4AYVQGSGDG9W',
						reference_id: '01JE6F04N2RE5KEAK4HYYPJ4AK',
						amount: '100.00',
						status: 'processed',
					}
				]
			}
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await refund({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JE6EZVK4FGMM4AYVQF23K17B/refund',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer access_token',
				}
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});

	test('should refund an Order partially', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JE6T2CWF7FDDD08HJNXBKM37';
		const refundRequest: RefundRequest = {
			transactions: [
				{
					id: 'pay_01JE6T2CWF7FDDD08HJS8DTAXR',
					amount: '25.00'
				}
			]
		};
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 201,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			status: 'processed',
			status_detail: 'partially_refunded',
			transactions: {
				refunds: [
					{
						id: 'ref_01JE6T3H34FJBXF8K70RAMFYA1',
						transaction_id: 'pay_01JE6T2CWF7FDDD08HJS8DTAXR',
						reference_id: '01JE6T3GB9RHDXXXAQX41864R6',
						amount: '25.00',
						status: 'processed',
					}
				]
			}
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await refund({ id: orderId, body: refundRequest, config });

		expect(spyFetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/refund`,
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer access_token',
				},
				body: JSON.stringify(refundRequest),
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});
});
