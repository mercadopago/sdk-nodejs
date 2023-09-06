import update from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';
import type { PaymentCapture } from './types';

jest.mock('@utils/restClient');

describe('Testing Payment Capture, update', () => {
	test('should successfully make a request with "transaction_amount" in the body', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const capture: PaymentCapture = {
			id: '1234',
			body: {
				transaction_amount: 75,
			},
			config: client,
		};

		const expectedBody = {
			transaction_amount: 75,
			capture: true,
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token',
			'Content-Type': 'application/json',
		};
		await update(capture);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/v1/payments/${capture.id}`,
			expect.objectContaining({
				method: 'PUT',
				headers: expectedHeaders,
				body: JSON.stringify(expectedBody),
			})
		);
	});

	test('should successfully make a request with an empty body', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const capture: PaymentCapture = {
			id: '1234',
			body: {
			},
			config: client,
		};
		const expectedBody = {
			capture: true,
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token',
			'Content-Type': 'application/json',
		};
		await update(capture);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/v1/payments/${capture.id}`,
			expect.objectContaining({
				method: 'PUT',
				headers: expectedHeaders,
				body: JSON.stringify(expectedBody),
			})
		);
	});
});
