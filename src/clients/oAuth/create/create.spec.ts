import { RestClient } from '@src/utils/restClient';
import { OAuthRequest } from './types';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import create from '.';

jest.mock('@utils/restClient');

describe('Testing OAuth, create', () => {
	test('should make a POST request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const oauthRequest: OAuthRequest = {
			client_secret: '',
			client_id: '',
			code: '',
			redirect_uri: ''
		};

		const expectedBody = {
			...oauthRequest,
			'grant_type': 'authorization_code',
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token',
			'Content-Type': 'application/json',
		};

		await create({ oauthRequest, config : client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/oauth/token',
			expect.objectContaining({
				method: 'POST',
				headers: expectedHeaders,
				body: JSON.stringify(expectedBody),
			})
		);

	});
});
