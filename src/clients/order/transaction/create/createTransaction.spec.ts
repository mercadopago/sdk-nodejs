import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OrderCreateTransactionClient, OrderCreateTransactionRequest } from './types';
import createTransaction from '.';
import { TransactionsApiResponse } from '../../commonTypes';

jest.mock('@utils/restClient');

describe('Create Order transaction', () => {
	test('should create Order transaction', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockRequestBody: OrderCreateTransactionRequest = {
			payments: [
				{
					amount: '100.00',
					payment_method: {
						id: 'master',
						type: 'credit_card',
						token: 'card_token',
						installments: 1,
					},
				}
			]
		};
		const orderId = '01JE3XD9V38N19CSFH40K6G3EY';
		const mockCreate: OrderCreateTransactionClient = {
			id: orderId,
			body: mockRequestBody,
			config
		};
		const mockResponse: TransactionsApiResponse = {
			api_response: {
				status: 201,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			payments: [
				{
					id: 'pay_01JE3XD9V38N19CSFH443VVHAJ',
					amount: '100.00',
					payment_method: {
						id: 'master',
						type: 'credit_card',
						installments: 1,
					}
				}
			]
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

		const createdTransaction = await createTransaction(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/transactions`,
			{
				body: JSON.stringify(mockRequestBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);
		expect(createdTransaction).toEqual(mockResponse);
	});
});
