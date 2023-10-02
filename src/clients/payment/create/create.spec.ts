import create from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PaymentCreateClient } from './types';

jest.mock('@utils/restClient');

describe('Testing create payments', () => {
	test('should pass forward request options from create to RestClient.create', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const mockBody = {
			description: 'description',
			payer: {
				email: 'emal@email.com'
			},
			transaction_amount: 12.34,
		};
		const mockCreate: PaymentCreateClient = {
			body: mockBody,
			config: client
		};
		await create(mockCreate);
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/v1/payments',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer token'
				},
				method: 'POST',
				timeout: 5000
			}
		);
	});
});
