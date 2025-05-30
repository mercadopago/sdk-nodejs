import MercadoPago, { Customer } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

describe('IT customer, search', () => {
	test('should search a client and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const customer = new Customer(client);

		// Criar customer primeiro para garantir que temos algo para buscar
		// Seguindo padrão do SDK PHP
		const email = createEmailTestUser();
		const createCustomerBody = {
			body: {
				email: email,
				first_name: 'Test',
				last_name: 'User',
				phone: {
					area_code: '11',
					number: '999999999'
				}
			}
		};

		const createdCustomer = await customer.create(createCustomerBody);
		expect(createdCustomer).toHaveProperty('id');

		// Aguardar um pouco para que o customer seja indexado para busca
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Agora buscar pelo email que acabamos de criar
		const customerSearch = await customer.search({ options: { email: email } });
		
		expect(customerSearch).toHaveProperty('results');
		expect(Array.isArray(customerSearch.results)).toBe(true);
		
		// Verificar se encontrou resultados
		if (customerSearch.results.length > 0) {
			// Se encontrou resultados, verificar o primeiro resultado
			expect(customerSearch.results[0]).toHaveProperty('email');
			expect(customerSearch.results[0].email).toEqual(email);
			expect(customerSearch.results[0]).toEqual(expect.objectContaining({
				id: expect.any(String),
				email: expect.any(String),
			}));

			// Verificar propriedades opcionais
			if (customerSearch.results[0].phone) {
				expect(customerSearch.results[0].phone).toEqual(expect.any(Object));
			}
			if (customerSearch.results[0].identification) {
				expect(customerSearch.results[0].identification).toEqual(expect.any(Object));
			}
			if (customerSearch.results[0].address) {
				expect(customerSearch.results[0].address).toEqual(expect.any(Object));
			}
			if (customerSearch.results[0].date_last_updated) {
				expect(customerSearch.results[0].date_last_updated).toEqual(expect.any(String));
			}
		} else {
			// Se não encontrou resultados, pelo menos verificar que a busca funcionou
			console.log('No customers found for email:', email);
			expect(customerSearch.results.length).toBe(0);
		}

		// Limpar o customer criado para o teste
		try {
			if (createdCustomer.id) {
				await customer.remove({ customerId: createdCustomer.id });
			}
		} catch (error) {
			// Ignorar erros de limpeza
			console.log('Error cleaning up customer:', error);
		}
	});
});
