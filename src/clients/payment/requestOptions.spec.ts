import { Payment } from './index';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

test('per-request options do not leak to later calls', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const payment = new Payment(config);
	const fetch = jest.spyOn(RestClient, 'fetch');
	await payment.create({ body: { transaction_amount: 10 }, requestOptions: { idempotencyKey: 'first' } });
	await payment.create({ body: { transaction_amount: 20 } });
	expect(fetch.mock.calls[0][1]).toEqual(expect.objectContaining({ idempotencyKey: 'first' }));
	expect(fetch.mock.calls[1][1]).not.toHaveProperty('idempotencyKey');
	expect(config.options).toEqual({ timeout: 5000 });
});
