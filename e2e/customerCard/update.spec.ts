import MercadoPago, { Customer, CustomerCard } from '@src/index';
import fetch from 'node-fetch';
import { config } from '../e2e.config';

describe('Testing customer card, get', () => {
	test('should update card and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.test_access_token, options: { timeout: 5000 } });
		const customerCard = new CustomerCard(client);
		const customer = new Customer(client);

		const email = createEmailTestUser();
		const emailBody = {
			email,
		};
		const createCustomer = await customer.create({ body: emailBody });
		expect(createCustomer).toHaveProperty('id');

		const createToken = await createCardToken();
		const customerBody = {
			token: createToken.id
		};

		const createCustomerCard = await customerCard.create({ customerId: createCustomer.id, body: customerBody });
		expect(createCustomerCard).toHaveProperty('id');

		const body = {
			expiration_month: 1,
			expiration_year: 2027,
			cardholder: {
				name: 'Test',
				identification: {
					type: 'CNPJ',
				}
			},
		};

		const updateCustomerCard = await customerCard.update({ customerId: createCustomer.id, cardId: createCustomerCard.id, body: body });
		expect(updateCustomerCard.cardholder.name).toBe('Test');
		expect(updateCustomerCard.cardholder.identification.type).toBe('CNPJ');
		expect(updateCustomerCard.expiration_month).toBe(1);
		expect(updateCustomerCard.expiration_year).toBe(2027);
		expect(updateCustomerCard.id).toBe(createCustomerCard.id);
		expect(updateCustomerCard).toEqual(expect.objectContaining({
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

	function createEmailTestUser() {
		const random = Math.floor(Math.random() * 1000000);
		const email = 'test_user' + random + '@testuser.com';
		return email;
	}

	async function createCardToken() {
		const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + config.test_access_token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				site_id: 'MLB',
				card_number: '5031433215406351',
				expiration_year: '2025',
				expiration_month: '11',
				security_code: '123',
				cardholder: {
					identification: {
						type: 'CPF',
						number: '01234567890'
					},
					name: 'APRO'
				}
			})
		});
		return await response.json();
	}
});
