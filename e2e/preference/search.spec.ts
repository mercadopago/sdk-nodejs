import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Preference IT, search', () => {
	test('should search a request and match response object', async () => {
		const client = new MercadoPago({  accessToken: config.access_token });
		const preference = new Preference(client);

		const searched = await preference.search();

		expect(searched).toEqual(expect.objectContaining({
			elements: expect.any(Array),
			next_offset: expect.any(Number),
			total: expect.any(Number),
		}));
		expect(searched.elements.length).toBeGreaterThan(0);
		expect(searched.elements[0]).toEqual(expect.objectContaining({
			id: expect.any(String),
			client_id: expect.any(String),
			collector_id: expect.any(Number),
			date_created: expect.any(String),
			expires: expect.any(Boolean),
			live_mode: expect.any(Boolean),
			marketplace: expect.any(String),
			operation_type: expect.any(String),
			site_id:  expect.any(String),
			sponsor_id: expect.any(Number),
			shipping_mode: expect.any(String),
		}));
	});
});
