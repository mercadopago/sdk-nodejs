import MercadoPago, { IdentificationType } from '@src/index';
import { config } from '../e2e.config';

describe('IT identification types', () => {
	test('should return all types of documents available by country ', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const identificationType = new IdentificationType(client);
		const getList = await identificationType.list();

		expect(Array.isArray(getList)).toBe(true);
		getList.forEach((item) => { expect(['CPF', 'CNPJ']).toContain(item.id); });
		expect(getList[0]).toEqual(expect.objectContaining({
			id: expect.any(String),
			name: expect.any(String),
			type: expect.any(String),
			min_length: expect.any(Number),
			max_length: expect.any(Number),
		}));
	});
});
