import searchPaymentIntent from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing payment intent, search', () => {
	test('should make a GET request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({
			accessToken: 'token',
			options: { timeout: 5000 },
		});
		const payment_intent_id: string = '123456789';

		const expectedHeaders = {
			Authorization: 'Bearer token',
		};

		await searchPaymentIntent({ payment_intent_id, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/point/integration-api/payment-intents/123456789',
			expect.objectContaining({
				method: 'GET',
				headers: expectedHeaders,
				...client.options,
			})
		);
	});
});
