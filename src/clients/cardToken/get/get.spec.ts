import get from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing card tokens, get', () => {
	test('should pass forward request options from get to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const mockId = '00000000';
		await get({ id: mockId, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith(`/v1/card_tokens/${mockId}`, {
			headers: { Authorization: 'Bearer token' },
			timeout: 5000
		});
	});
});
