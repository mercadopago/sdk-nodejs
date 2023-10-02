import search from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing search payments, search', () => {
	test('should pass forward request options from search to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		await search({ config : client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/v1/payments/search', { 'headers': { 'Authorization': 'Bearer token' }, 'queryParams': {}, 'timeout': 5000 });
	});
});
