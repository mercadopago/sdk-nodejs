import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import cancel from './index';
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Cancel Order', () => {
	test('should cancel an Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JE48XZBYRK6W22V7DFQRABEV';
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
			status: 'canceled',
			status_detail: 'canceled',
			total_amount: '200.00',
			transactions: {
				payments: [
					{
						status: 'canceled',
						status_detail: 'canceled_transaction'
					}
				]
			}
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await cancel({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JE48XZBYRK6W22V7DFQRABEV/cancel',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer access_token',
				}
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});
});
