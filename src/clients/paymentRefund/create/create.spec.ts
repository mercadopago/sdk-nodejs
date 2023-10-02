import create from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PaymentRefundCreateClient } from './types';

jest.mock('@utils/restClient');

describe('Testing payments refunds, create', () => {
	test('should successfully make a request with "amount" in the body', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const request: PaymentRefundCreateClient = {
			payment_id: '123',
			body: {
				amount: 5
			},
			config: client,
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token',
		};

		await create(request);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/v1/payments/${request.payment_id}/refunds`,
			expect.objectContaining({
				method: 'POST',
				headers: expectedHeaders,
				body: JSON.stringify(request.body),
			})
		);

	});

	test('should successfully make a request without a body', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const request: PaymentRefundCreateClient = {
			payment_id: '123',
			config: client,
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token',
		};

		await create(request);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/v1/payments/${request.payment_id}/refunds`,
			expect.objectContaining({
				method: 'POST',
				headers: expectedHeaders,
			})
		);

	});
});
