import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import capture from './index';
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Capture Order', () => {
	test('should capture Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JDWRMDVV50162D6E0MMY3PG6';
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 200,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			status: 'processed',
			status_detail: 'accredited',
			transactions: {
				payments: [
					{
						id: 'pay_01JDWRMDVV50162D6E0QNW5N1Y',
						amount: '200.00',
						status: 'processed',
						status_detail: 'accredited',
						reference_id: '0001s10i0d'
					}
				]
			}
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await capture({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JDWRMDVV50162D6E0MMY3PG6/capture',
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
