import getPaymentIntentList from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

import type { PointGetPaymentIntentListClient } from './types';

jest.mock('@utils/restClient');

describe('Testing payment intent, list', () => {
	test('should make a GET request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({
			accessToken: 'token',
			options: { timeout: 5000 },
		});
		const search: PointGetPaymentIntentListClient = {
			options: {
				startDate: '2023-01-01',
				endDate: '2023-12-31',
			},
			config: client,
		};
		const expectedHeaders = {
			Authorization: 'Bearer token',
		};

		await getPaymentIntentList(search);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/point/integration-api/payment-intents/events',
			expect.objectContaining({
				method: 'GET',
				headers: expectedHeaders,
				queryParams: {
					...search.options,
				},
				...client.options,
			})
		);
	});
});
