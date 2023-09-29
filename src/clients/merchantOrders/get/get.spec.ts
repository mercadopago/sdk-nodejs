import get from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing merchantOrder, get', () => {
	test('should pass forward request options from get to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		await get({ merchantOrderId: '123', config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/merchant_orders/123', { 'headers': { 'Authorization': 'Bearer token' }, 'timeout': 5000 });
	});
});
