import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { UpdatePreference } from './types';
import update from '.';

jest.mock('@utils/restClient');

describe('Testing preference, update', () => {
	test('should make a PUT request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const preferenceRequest: UpdatePreference = {
			id: '1273205088-4cbd8faf-eb95-4dc3-b7cd-82cf979856b4',
			updatePreferenceRequest: {
				items: [],
			},
			config: client,
		};
		const expectedHeaders = {
			'Authorization': 'Bearer token',
			'Content-Type': 'application/json',
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
