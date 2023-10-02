import capture from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing search payments, capture', () => {
	test('should pass forward request options from capture to RestClient.capture', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const mockPaymentId = '00000000';
		await capture({ id: mockPaymentId, transaction_amount: 12.34, config : client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		const expectedBody = { capture :true, transaction_amount: 12.34 };
		expect(spyFetch).toHaveBeenCalledWith(`/v1/payments/${mockPaymentId}`, {
			body: JSON.stringify(expectedBody),
			headers: {
				Authorization: 'Bearer token',
			},
			method: 'PUT',
		});
	});
});
