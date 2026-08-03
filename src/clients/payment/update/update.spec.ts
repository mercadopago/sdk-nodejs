import update from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing payments, update', () => {
	test('should call RestClient.fetch with PUT method and provided body', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const mockPaymentId = '00000000';
		const updateBody = { status: 'cancelled', transaction_amount: 100 };
		await update({ id: mockPaymentId, body: updateBody, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(`/v1/payments/${mockPaymentId}`, {
			body: JSON.stringify(updateBody),
			headers: {
				Authorization: 'Bearer token',
			},
			method: 'PUT',
		});
	});
});
