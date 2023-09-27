import cancelPaymentIntent from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing payment intent, cancel', () => {
	test('should make a DELETE request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({
			accessToken: 'token',
			options: { timeout: 5000 },
		});
		const device_id: string = 'GERTEC_MP123__12345678';
		const payment_intent_id: string = '123456789';

		const expectedHeaders = {
			Authorization: 'Bearer token',
		};

		await cancelPaymentIntent({ device_id, payment_intent_id, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/point/integration-api/devices/GERTEC_MP123__12345678/payment-intents/123456789',
			expect.objectContaining({
				method: 'DELETE',
				headers: expectedHeaders,
			})
		);
	});
});
