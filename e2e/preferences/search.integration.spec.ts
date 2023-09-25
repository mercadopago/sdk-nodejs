import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import search from '../../src/clients/preferences/search';

describe('Testing preference, search', () => {
	test('should SEARCH a request with success', async () => {
		const client = new MercadoPagoConfig({  accessToken: 'access_token', options: { timeout: 5000 } });

		const searched = await search({ config: client });

		expect(searched).toEqual(expect.objectContaining({
			elements: expect.any(Array),
			next_offset: expect.any(Number),
			total: expect.any(Number),
		}));
		expect(searched.elements.length === 0).toBe(false);
	});

});
