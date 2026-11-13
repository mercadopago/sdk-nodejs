import create from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing Store, create', () => {
	test('should make a POST request to /users/:user_id/stores with correct headers and body', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const body = { name: 'Main Store', business_hours: {} };
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await create({ userId: '123', body, config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/users/123/stores',
			expect.objectContaining({
				method: 'POST',
				headers: { 'Authorization': 'Bearer token' },
				body: JSON.stringify(body)
			})
		);
	});
});
