import create from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PreApprovalRequest } from '@src/clients/preApproval/commonTypes';

jest.mock('@utils/restClient');

describe('Testing preApproval , create', () => {
	test('should make a POST request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body: PreApprovalRequest = {
			reason: 'test',
			external_reference: 'S01',
			payer_email: 'test@testuser.com',
			auto_recurring: {
				frequency: 1,
				frequency_type: 'days',
				transaction_amount: 10,
				currency_id: 'BRL'
			},
			back_url: 'https://www.test.com',
			status: 'pending'
		};

		const expectedHeaders = {
			'Authorization': 'Bearer token'
		};

		await create({ body, config : client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			'/preapproval/',
			expect.objectContaining({
				method: 'POST',
				headers: expectedHeaders,
				body: JSON.stringify(body),
			})
		);

	});
});
