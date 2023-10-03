import remove from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing customer cards ,remove', () => {
	test('should pass forward request options from remove to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		await remove({ customerId: '123', cardId: '123', config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith( '/v1/customers/123/cards/123', { 'headers': { 'Authorization': 'Bearer token' }, 'method': 'DELETE', 'timeout': 5000 });
	});
});
