import search from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing Store, search', () => {
	test('should pass forward request options from search to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue({ results: [], total: 0 });

		await search({ userId: 123456, options: { external_id: 'SUC001' }, config: client });

		expect(spyFetch).toHaveBeenCalledWith('/users/123456/stores/search', {
			'method': 'GET',
			'headers': { 'Authorization': 'Bearer token' },
			'queryParams': { 'external_id': 'SUC001' },
			'timeout': 5000 });
	});
});
