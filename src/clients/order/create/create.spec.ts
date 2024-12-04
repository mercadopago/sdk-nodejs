import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OrderCreateClient, CreateOrderRequest } from './types';
import create from '.';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

jest.mock('@utils/restClient');

describe('Create Order', () => {
	test('should create Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			total_amount: '1000.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: 'card_token',
							installments: 1,
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
		};
		const mockCreate: OrderCreateClient = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);
	});
});
