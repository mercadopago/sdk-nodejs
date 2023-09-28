import update from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PreferenceUpdateClient } from './types';

jest.mock('@utils/restClient');

describe('Testing preference, update', () => {
	test('should make a PUT request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const preferenceRequest: PreferenceUpdateClient = {
			id: '1234',
			updatePreferenceRequest: {
				items: [],
			},
			config: client,
		};
		const expectedHeaders = {
			'Authorization': 'Bearer token'
		};
		await update(preferenceRequest);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/checkout/preferences/${preferenceRequest.id}`,
			expect.objectContaining({
				method: 'PUT',
				headers: expectedHeaders,
				body: JSON.stringify(preferenceRequest.updatePreferenceRequest),
			})
		);
	});
});
