import MercadoPago, { User } from '@src/index';
import { config } from '../e2e.config';

describe('Testing User, get method', () => {
	test('should return user data with success', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const user = new User(client);

		const getUser = await user.get();

		expect(getUser).toHaveProperty('id');
		expect(getUser).toEqual(expect.objectContaining({
			id: expect.any(Number),
			nickname: expect.any(String),
			registration_date: expect.any(String),
			first_name: expect.any(String),
			last_name: expect.any(String),
			gender: expect.any(String),
			country_id: expect.any(String),
			email: expect.any(String),
			identification: expect.any(Object),
			phone: expect.any(Object),
			address: expect.any(Object),
			alternative_phone: expect.any(Object),
			user_type: expect.any(String),
			tags: expect.any(Array),
			points: expect.any(Number),
			site_id: expect.any(String),
			permalink: expect.any(String),
			seller_experience: expect.any(String),
			bill_data: expect.any(Object),
			seller_reputation: expect.any(Object),
			buyer_reputation: expect.any(Object),
			status: expect.any(Object),
			secure_email: expect.any(String),
			company: expect.any(Object),
			credit: expect.any(Object),
			context: expect.any(Object),
			registration_identifiers: expect.any(Array),
		}));
	});
});
