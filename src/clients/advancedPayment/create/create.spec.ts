import create from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing advancedPayment, create', () => {
	test('should make a POST request to /v1/advanced_payments with correct headers', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const body = { application_id: 'app', payments: [], disbursements: [] };
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await create({ body, config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments',
			expect.objectContaining({
				method: 'POST',
				headers: { 'Authorization': 'Bearer token' },
				body: JSON.stringify(body)
			})
		);
	});
});
