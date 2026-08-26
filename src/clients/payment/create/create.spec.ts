import create from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PaymentCreateClient, PaymentCreateRequest } from './types';
import type { PaymentResponse } from '../commonTypes';

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

	test('should serialize credential-on-file network data inside transaction data', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const mockBody: PaymentCreateRequest = {
			transaction_amount: 12.34,
			payer: { email: 'email@example.com' },
			point_of_interaction: {
				type: 'CREDENTIAL_ON_FILE',
				transaction_data: {
					network_transaction_id: 'n7w-c0d3-t7d',
					network_data: {
						transaction_id: 'VISA-TID-ABC123',
						transaction_link_id: '550e8400-e29b-41d4-a716-446655440000',
					},
				},
			},
		};

		await create({ body: mockBody, config: client });

		expect(jest.spyOn(RestClient, 'fetch')).toHaveBeenCalledWith('/v1/payments', expect.objectContaining({
			body: JSON.stringify(mockBody),
		}));
	});

	test('should expose credential-on-file network data and subscription fields in responses', () => {
		const response: PaymentResponse = {
			id: 123,
			api_response: {
				status: 200,
				headers: ['content-type', ['application/json']],
			},
			point_of_interaction: {
				transaction_data: {
					network_transaction_id: 'n7w-c0d3-t7d',
					network_data: {
						transaction_id: 'VISA-TID-ABC123',
						transaction_link_id: '550e8400-e29b-41d4-a716-446655440000',
					},
					subscription_id: 'subscription-123',
					subscription_sequence: { number: 2, total: 12 },
					invoice_period: { period: 1, type: 'monthly' },
					billing_date: '2026-08-01',
				},
			},
			expanded: {
				gateway: {
					reference: {
						network_transaction_id: 'n7w-c0d3-t7d',
						network_data: { transaction_id: 'VISA-TID-ABC123' },
					},
				},
			},
		};

		expect(response.point_of_interaction?.transaction_data?.network_data?.transaction_id).toBe('VISA-TID-ABC123');
		expect(response.expanded?.gateway?.reference?.network_data?.transaction_id).toBe('VISA-TID-ABC123');
	});
});
