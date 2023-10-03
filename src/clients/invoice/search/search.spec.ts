import search from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing invoice, search', () => {
	test('should make a SEARCH request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const expectedHeaders = {
			'Authorization': 'Bearer token',
		};
		await search({ config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/authorized_payments/search',
			expect.objectContaining({
				headers: expectedHeaders,
				queryParams: {}
			})
		);
	});
});
