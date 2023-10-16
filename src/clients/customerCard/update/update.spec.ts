import update from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing customer cards, update', () => {
	test('should pass forward request options from update to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const body = {
			cardholder: {
				name: 'CONT',
				identification: {
					type: 'CPF'
				}
			}
		};

		await update({ customerId: '123', cardId: '123', body: body, config: client });

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith( '/v1/customers/123/cards/123', { 'body': '{"cardholder":{"name":"CONT","identification":{"type":"CPF"}}}',
			'headers': { 'Authorization': 'Bearer token' }, 'method': 'PUT', 'timeout': 5000 });
	});
});
