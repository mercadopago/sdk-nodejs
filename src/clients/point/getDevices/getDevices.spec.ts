import getDevices from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing devices, get', () => {
	test('should make a GET request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({
			accessToken: 'token',
			options: { timeout: 5000 },
		});
		const options = {
			store_id: '123456789',
			pos_id: '123456789',
			limit: 10,
			offset: 0,
		};
		const expectedHeaders = {
			Authorization: 'Bearer token',
		};

		await getDevices({ options, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/point/integration-api/devices',
			expect.objectContaining({
				method: 'GET',
				headers: expectedHeaders,
				queryParams: options,
				...client.options,
			})
		);
	});
});
