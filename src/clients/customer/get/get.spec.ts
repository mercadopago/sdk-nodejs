import get from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing customer, get', () => {
	test('should pass forward request options from get to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		await get({ customerId: '123', config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/v1/customers/123', { 'headers': { 'Authorization': 'Bearer token' }, 'timeout': 5000 });
	});

	test('should encode customer id as a path segment', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		await get({ customerId: '../../applications/123', config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/v1/customers/..%2F..%2Fapplications%2F123', { 'headers': { 'Authorization': 'Bearer token' } });
	});
});
