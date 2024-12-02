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
});