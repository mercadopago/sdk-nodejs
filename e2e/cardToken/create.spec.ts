import MercadoPago, { CardToken, Customer, CustomerCard } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';
import { createCardToken } from '@src/mocks/createCardToken';

describe('IT, create card token', () => {
	test('should make a request and return created card token id', async () => {
		const client = new MercadoPago({ accessToken: config.test_access_token });
		const cardToken = new CardToken(client);
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
		expect(createCustomerCard).toHaveProperty('id');

		const cardTokenBody = {
			card_id: createCustomerCard.id,
			security_code: '123'
		};
		const createCardTokenClient = await cardToken.create({ body: cardTokenBody });
		expect(createCardTokenClient).toHaveProperty('id');
		expect(createCardTokenClient).toHaveProperty('status', 'active');
		expect(createCardTokenClient).toEqual(expect.objectContaining({
			id: expect.any(String),
			card_id: expect.any(String),
			status: expect.any(String),
			date_created: expect.any(String),
			date_last_updated: expect.any(String),
			date_due: expect.any(String),
			luhn_validation: expect.any(Boolean),
			live_mode: expect.any(Boolean),
			require_esc: expect.any(Boolean),
			security_code_length: expect.any(Number),
		}));
	});
});
