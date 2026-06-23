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



describe('Create Order', () => {
	test('should support payment_method.id = "boleto" in request and response', async () => {
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
							id: 'boleto',
							type: 'ticket',
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};
		const mockCreate: OrderCreateClient = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		(RestClient.fetch as jest.Mock).mockResolvedValue({
			transactions: {
				payments: [
					{
						payment_method: {
							id: 'boleto',
							type: 'ticket'
						}
					}
				]
			},
			status: 'processed'
		});

		const response = await create(mockCreate);

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

		expect(response.transactions.payments[0].payment_method.id).toBe('boleto');
	});
});

describe('Create Order', () => {
	test('should support capture_mode = "automatic_async" in request and response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody = {
			type: 'online',
			total_amount: '1000.00',
			capture_mode: 'automatic_async',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: 'card_token',
							installments: 1
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};

		const mockCreate = {
			body: mockBody,
			config
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');

		(RestClient.fetch as jest.Mock).mockResolvedValue({
			capture_mode: 'automatic_async',
			status: 'processed'
		});

		const response = await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/orders',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);

		expect(response.capture_mode).toBe('automatic_async');
	});
});

describe('Create Order', () => {
	test('should support additional_info.payer.authentication_type in request', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody = {
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
							installments: 1
						}
					}
				]
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};

		const mockCreate = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({ status: 'processed' });

		await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({ body: expect.stringContaining('"authentication_type":"senha"')
			})
		);
	});
});
