import get from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing chargeback, get', () => {
	test('should make a GET request to /v1/chargebacks/:id with correct headers', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await get({ id: 'CB-001', config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/chargebacks/CB-001',
			expect.objectContaining({
				method: 'GET',
				headers: { 'Authorization': 'Bearer token' }
			})
		);
	});
});
