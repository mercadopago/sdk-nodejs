import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import process from './index';
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Process Order', () => {
	test('should process Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JDWFFTAJ5S3G6JDNQ4T66FBN';
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
			status: 'processed',
			status_detail: 'accredited',
			total_amount: '200.00',
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);
		
		const result = await process({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JDWFFTAJ5S3G6JDNQ4T66FBN/process',
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