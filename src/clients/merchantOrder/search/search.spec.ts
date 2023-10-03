import search from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { MerchantOrderSearchOptions } from './types';

jest.mock('@utils/restClient');

describe('Testing customer, search', () => {
	test('should pass forward request options from search to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const searchOptions: MerchantOrderSearchOptions = {
			application_id: '10000000000000000'
		};

		await search({ options: searchOptions, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/merchant_orders/search', {
			'headers': { 'Authorization': 'Bearer token' },
			'queryParams': { 'application_id': '10000000000000000' },
			'timeout': 5000 });
	});
});
