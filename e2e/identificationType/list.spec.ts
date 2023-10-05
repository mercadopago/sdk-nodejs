import MercadoPago, { IdentificationType } from '@src/index';
import { config } from '../e2e.config';

describe('Testing get list identification types', () => {
	test('should pass forward request options from get to RestClient.fetch', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 5000 } });
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
