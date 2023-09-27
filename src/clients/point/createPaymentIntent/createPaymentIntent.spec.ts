import createPaymentIntent from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

import type { PaymentIntentRequest } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Testing payment intent, create', () => {
	test('should make a POST request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({
			accessToken: 'token',
			options: { timeout: 5000 },
		});
		const request: PaymentIntentRequest = {
			amount: 100,
		};
		const device_id: string = 'GERTEC_MP123__12345678';

		const expectedHeaders = {
			Authorization: 'Bearer token',
		};

		await createPaymentIntent({ device_id, request, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/point/integration-api/devices/GERTEC_MP123__12345678/payment-intents',
			expect.objectContaining({
				method: 'POST',
				headers: expectedHeaders,
				body: JSON.stringify(request),
			})
		);
	});
});
