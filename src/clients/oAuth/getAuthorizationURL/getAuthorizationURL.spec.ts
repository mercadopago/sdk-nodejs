import getAuthorizationURL from '.';

describe('Testing oAuth, getAuthorizationURL', () => {
	test('getAuthorizationURL should correctly append query params to URL', async () => {

		const authorization = {
			options: {
				client_id: 'string',
				state: '12345',
				redirect_uri: 'https://httpdump.app/dumps/74cf0638-1a20-4482-b22d-2662a135cfd0',
			}
		};

		const authorizationURL = getAuthorizationURL(authorization);
		expect(authorizationURL)
			.toBe('https://auth.mercadopago.com/authorization?client_id=string&state=12345&redirect_uri=https%3A%2F%2Fhttpdump.app%2Fdumps%2F74cf0638-1a20-4482-b22d-2662a135cfd0&response_type=code&platform_id=mp');
	});
});
