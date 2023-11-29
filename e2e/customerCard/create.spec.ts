import MercadoPago, { Customer, CustomerCard } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';
import { createCardToken } from '@src/mocks/createCardToken';

describe('Testing customer cards, create', () => {
	test('should create customer card and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.test_access_token, options: { timeout: 5000 } });
		const customerCard = new CustomerCard(client);
		const customer = new Customer(client);

		const email = createEmailTestUser();
		const emailBody = {
			email,
		};
		const createCustomer = await customer.create({ body: emailBody });
		expect(createCustomer).toHaveProperty('id');

		const createToken = await createCardToken(client.accessToken);
		const customerBody = {
			token: createToken.id
		};

		const createCustomerCard = await customerCard.create({ customerId: createCustomer.id, body: customerBody });

		expect(createCustomerCard).toEqual(expect.objectContaining({
			id: expect.any(String),
			customer_id: expect.any(String),
			expiration_month: expect.any(Number),
			expiration_year: expect.any(Number),
			first_six_digits:expect.any(String),
			last_four_digits: expect.any(String),
			payment_method: expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String),
				payment_type_id: expect.any(String),
				thumbnail: expect.any(String),
				secure_thumbnail: expect.any(String)
			}),
			security_code: expect.objectContaining({
				length: expect.any(Number),
				card_location: expect.any(String)
			}),
			issuer: expect.objectContaining({
				id: expect.any(Number),
				name: expect.any(String)
			}),
			cardholder: expect.objectContaining({
				name: expect.any(String),
				identification: expect.any(Object)
			}),
			date_created: expect.any(String),
			date_last_updated: expect.any(String),
			user_id: expect.any(String),
			live_mode: expect.any(Boolean),
		}));

		const removeCard = await customerCard.remove({ customerId: createCustomer.id, cardId: createCustomerCard.id });
		expect(removeCard.api_response.status).toBe(200);
		const removeCustomer = await customer.remove({ customerId: createCustomer.id });
		expect(removeCustomer.api_response.status).toBe(200);
	});
});
