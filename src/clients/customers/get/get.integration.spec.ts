import get from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Testing customer, get', () => {
	test('shoud pass forward request options from get to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const customer = await get({ customerId: '1491447105-NKL4epM4MmjMnH', config: client });

		expect(customer).toHaveProperty('id', '1491447105-NKL4epM4MmjMnH');
		expect(customer).toHaveProperty('email', 'test_user_309842984u20@testuser.com');

	});
});
