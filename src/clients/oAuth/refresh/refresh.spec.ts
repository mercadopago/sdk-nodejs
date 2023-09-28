import refresh from '.';

import { RestClient } from '@src/utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OAuthRefresh } from './types';

jest.mock('@utils/restClient');

describe('Testing OAuth, refresh', () => {
	test('should make a request with input params and add grant_type', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const oauthRequest: OAuthRefresh = {
			client_secret: '',
			client_id: '',
			refresh_token: ''
		};

		const body = {
			...oauthRequest,
			'grant_type': 'refresh_token',
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token',
		};

		await refresh({ body, config : client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/oauth/token',
			expect.objectContaining({
				method: 'POST',
				headers: expectedHeaders,
				body: JSON.stringify(body),
			})
		);

	});
});
