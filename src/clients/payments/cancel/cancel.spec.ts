import cancel from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing payments, cancel', () => {
	test('should pass forward request options from cancel to RestClient.cancel', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const mockPaymentId = '00000000';
		await cancel({ id: mockPaymentId, config : client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		const expectedBody = { status:'cancelled' };
		expect(spyFetch).toHaveBeenCalledWith(`/v1/payments/${mockPaymentId}`, {
			body: JSON.stringify(expectedBody),
			headers: {
				Authorization: 'Bearer token',
			},
			method: 'PUT',
		});
	});
});
