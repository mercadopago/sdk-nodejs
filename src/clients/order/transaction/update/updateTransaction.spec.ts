import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OrderUpdateTransactionClient } from './types';
import { PaymentApiResponse, PaymentRequest } from '../../commonTypes';
import updateTransaction from '.';

jest.mock('@utils/restClient');

describe('Update Order transaction', () => {
	test('should update Order transaction', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockRequestBody: PaymentRequest = {
			payment_method: {
				installments: 3,
			}
		};
		const orderId = '01JE3XD9V38N19CSFH40K6G3EY';
		const transactionId = 'pay_01JE3XD9V38N19CSFH443VVHAJ';
		const mockUpdate: OrderUpdateTransactionClient = {
			id: orderId,
			transactionId,
			body: mockRequestBody,
			config
		};
		const mockResponse: PaymentApiResponse = {
			api_response: {
				status: 200,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			payment_method: {
				installments: 3,
			},
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

		const updatedTransaction = await updateTransaction(mockUpdate);

		expect(spyFetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/transactions/${transactionId}`,
			{
				body: JSON.stringify(mockRequestBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'PUT',
				timeout: 5000
			}
		);
		expect(updatedTransaction).toEqual(mockResponse);
	});
});
