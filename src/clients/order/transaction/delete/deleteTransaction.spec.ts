import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import deleteTransaction from '.';
import { OrderDeleteTransactionClient } from './types';

jest.mock('@utils/restClient');

describe('Delete Order transaction', () => {
	test('should delete Order transaction sucessfully', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const orderId = '01JE3XD9V38N19CSFH40K6G3EY';
		const transactionId = 'pay_01JE3XD9V38N19CSFH443VVHAJ';
		const mockDelete: OrderDeleteTransactionClient = {
			id: orderId,
			transactionId,
			config
		};
		const mockResponse = {
			status: 204,
		};
		jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

		const result = await deleteTransaction(mockDelete);

		expect(RestClient.fetch).toHaveBeenCalledWith(
			`/v1/orders/${orderId}/transactions/${transactionId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer access_token',
				},
				...config.options
			}
		);
		expect(result).toEqual({
			status: 204,
		});
	});

	test('should handle error when transaction fails to delete', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JE3XD9V38N19CSFH40K6G3EY';
		const transactionId = 'pay_01JE3XD9V38N19CSFH443VVHAJ';
		const mockDelete: OrderDeleteTransactionClient = {
			id: orderId,
			transactionId,
			config
		};
		const errorResponse = {
			status: 400,
			json: jest.fn().mockResolvedValue({
				errors: [{ message: 'Error deleting transaction' }]
			}),
		};
		jest.spyOn(RestClient, 'fetch').mockResolvedValue(errorResponse);

		const result = await deleteTransaction(mockDelete);

		expect(result).toEqual({
			status: 400,
			json: expect.any(Function),
		});
	});
});
