import MercadoPago, { User } from '@src/index';
import { config } from '../e2e.config';

describe('Testing User, get method', () => {
	test('should return user data with success', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
		const user = new User(client);

		const getUser = await user.get();

		// Verificar propriedades obrigatórias
		expect(getUser).toHaveProperty('id');
		expect(getUser.id).toEqual(expect.any(Number));
		
		// Verificar que o objeto contém as propriedades principais esperadas
		expect(getUser).toEqual(expect.objectContaining({
			id: expect.any(Number),
			nickname: expect.any(String),
			registration_date: expect.any(String),
			country_id: expect.any(String),
			site_id: expect.any(String),
			user_type: expect.any(String),
		}));

		// Verificar propriedades que podem ser string ou null
		if (getUser.first_name !== null) {
			expect(getUser.first_name).toEqual(expect.any(String));
		}
		if (getUser.last_name !== null) {
			expect(getUser.last_name).toEqual(expect.any(String));
		}
		if (getUser.email !== null) {
			expect(getUser.email).toEqual(expect.any(String));
		}
		if (getUser.permalink !== null) {
			expect(getUser.permalink).toEqual(expect.any(String));
		}
		if (getUser.seller_experience !== null) {
			expect(getUser.seller_experience).toEqual(expect.any(String));
		}

		// Verificar objetos opcionais
		if (getUser.identification) {
			expect(getUser.identification).toEqual(expect.any(Object));
		}
		if (getUser.phone) {
			expect(getUser.phone).toEqual(expect.any(Object));
		}
		if (getUser.address) {
			expect(getUser.address).toEqual(expect.any(Object));
		}
		if (getUser.alternative_phone) {
			expect(getUser.alternative_phone).toEqual(expect.any(Object));
		}
		if (getUser.bill_data) {
			expect(getUser.bill_data).toEqual(expect.any(Object));
		}
		if (getUser.seller_reputation) {
			expect(getUser.seller_reputation).toEqual(expect.any(Object));
		}
		if (getUser.buyer_reputation) {
			expect(getUser.buyer_reputation).toEqual(expect.any(Object));
		}
		if (getUser.status) {
			expect(getUser.status).toEqual(expect.any(Object));
		}
		if (getUser.company) {
			expect(getUser.company).toEqual(expect.any(Object));
		}
		if (getUser.credit) {
			expect(getUser.credit).toEqual(expect.any(Object));
		}
		if (getUser.context) {
			expect(getUser.context).toEqual(expect.any(Object));
		}

		// Verificar arrays opcionais
		if (getUser.tags) {
			expect(getUser.tags).toEqual(expect.any(Array));
		}
		if (getUser.registration_identifiers) {
			expect(getUser.registration_identifiers).toEqual(expect.any(Array));
		}

		// Verificar números opcionais
		if (getUser.points !== null && getUser.points !== undefined) {
			expect(getUser.points).toEqual(expect.any(Number));
		}

		// Aceitar campos extras que a API pode retornar (como api_response)
		// Não fazemos verificações rígidas sobre campos extras para tornar o teste mais resiliente
	});
});
