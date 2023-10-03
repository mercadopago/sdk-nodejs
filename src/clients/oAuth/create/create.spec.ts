import create from '.';

import { RestClient } from '@src/utils/restClient';
import { OAuthRequest } from './types';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing OAuth, create', () => {
	test('should make a request with the input params and add grant_type', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const oauthRequest: OAuthRequest = {
			client_secret: '',
			client_id: '',
			code: '',
			redirect_uri: ''
		};

		const body = {
			...oauthRequest,
			'grant_type': 'authorization_code',
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token'
		};

		await create({ body, config : client });
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
