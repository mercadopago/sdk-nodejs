import create from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing card tokens, create', () => {
	test('should pass forward request options from create to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const body = {
			card_id : '11111111',
			security_code : '123'
		};

		await create({ body: body, config: client });

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/v1/card_tokens', { 'headers': { 'Authorization': 'Bearer token' },
			'timeout': 5000, 'body': '{"card_id":"11111111","security_code":"123"}',
			'method': 'POST' });
	});
});
