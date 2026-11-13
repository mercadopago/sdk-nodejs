import get from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing Store, get', () => {
	test('should call RestClient.fetch with GET and the exact path', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue({ id: '123' });

		await get({ storeId: '123', config });

		expect(spyFetch).toHaveBeenCalledWith('/stores/123', expect.objectContaining({
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
		}));
	});
});
