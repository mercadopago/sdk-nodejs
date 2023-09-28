import update from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PreApprovalUpdateClient } from './types';

jest.mock('@utils/restClient');

describe('Testing pre approval , update', () => {
	test('should make a PUT request with the correct parameters', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const preApproval: PreApprovalUpdateClient = {
			id: '1234',
			body: {
				back_url: 'https://www.test.com',
				reason: 'test',
				auto_recurring: {
					transaction_amount: 10,
					currency_id: '123'
				}
			},
			config: client,
		};
		const expectedHeaders = {
			'Authorization': 'Bearer token'
		};
		await update(preApproval);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(
			`/preapproval/${preApproval.id}`,
			expect.objectContaining({
				method: 'PUT',
				headers: expectedHeaders,
				body: JSON.stringify(preApproval.body),
			})
		);
	});
});
