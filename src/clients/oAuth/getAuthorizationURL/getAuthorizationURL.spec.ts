import getAuthorizationURL from '.';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing oAuth, getAuthorizationURL', () => {
	test('should make a SEARCH request with the correct parameters', async () => {

		const authorization = {
			filters: {
				client_id: 'string',
				state: '12345',
				redirect_uri: 'https://httpdump.app/dumps/74cf0638-1a20-4482-b22d-2662a135cfd0',
			}
		};

		getAuthorizationURL(authorization);
		const spyFetch = jest.spyOn(RestClient, 'appendQueryParamsToUrl');
		expect(spyFetch).toHaveBeenCalledWith(
			'https://auth.mercadopago.com/authorization',
			{
				client_id: 'string',
				response_type: 'code',
				platform_id: 'mp',
				state: '12345',
				redirect_uri: 'https://httpdump.app/dumps/74cf0638-1a20-4482-b22d-2662a135cfd0'
			},
		);
	});
});
