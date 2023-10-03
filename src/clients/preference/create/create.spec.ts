import create from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig'
;
import type { PreferenceRequest } from '@src/clients/preference/commonTypes';


jest.mock('@utils/restClient');

describe('Testing preference, create', () => {
	test('should make a POST request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body: PreferenceRequest = {
			items: [],
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token'
		};

		await create({ body, config : client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/checkout/preferences/',
			expect.objectContaining({
				method: 'POST',
				headers: expectedHeaders,
				body: JSON.stringify(body),
			})
		);

	});
});
