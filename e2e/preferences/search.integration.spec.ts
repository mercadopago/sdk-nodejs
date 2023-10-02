import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Testing preference, search', () => {
	test('should SEARCH a request with success', async () => {
		const client = new MercadoPago({  accessToken: config.access_token, options: { timeout: 5000 } });
		const preference = new Preference(client);

		const searched = await preference.search();

		expect(searched).toEqual(expect.objectContaining({
			elements: expect.any(Array),
			next_offset: expect.any(Number),
			total: expect.any(Number),
		}));
		expect(searched.elements.length).toBeGreaterThan(0);
	});

});
