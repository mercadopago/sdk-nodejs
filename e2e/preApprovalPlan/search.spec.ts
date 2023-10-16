import MercadoPago, { PreApprovalPlan } from '@src/index';
import { config } from '../e2e.config';

describe('Testing pre approval plan, create', () => {
	test('should make a POST request with the correct parameters', async () => {
		const client = new MercadoPago({ accessToken: config.test_access_token, options: { timeout: 5000 } });
		const preApprovalPlan = new PreApprovalPlan(client);
		const body = {
			back_url: 'https://www.mercadopago.com.br/developers/pt/reference/subscriptions/_preapproval_plan/post',
			reason: 'yoga class',
			auto_recurring:	{
				currency_id: 'BRL',
				transaction_amount: 10,
				frequency: 1,
				frequency_type: 'months'
			}
		};
		const createPlan = await preApprovalPlan.create({ body });
		expect(createPlan).toHaveProperty('id');

		const searchBody = {
			status: 'active',
		};

		const searchPlan = await preApprovalPlan.search({ options: searchBody });

		expect(searchPlan).toEqual(expect.objectContaining({
			results: expect.any(Array),
			paging: expect.objectContaining({
				total: expect.any(Number),
				limit: expect.any(Number),
				offset: expect.any(Number),
			}),
		}));
		expect(searchPlan.results[0].status).toBe(searchBody.status);
		expect(searchPlan.results[0]).toEqual(expect.objectContaining({
			id: expect.any(String),
			status: expect.any(String),
			reason: expect.any(String),
			back_url: expect.any(String),
			date_created: expect.any(String),
			collector_id: expect.any(Number),
			application_id: expect.any(Number),
			last_modified: expect.any(String),
			init_point: expect.any(String),
			auto_recurring: expect.objectContaining({
				frequency: expect.any(Number),
				frequency_type: expect.any(String),
				transaction_amount: expect.any(Number),
				currency_id: expect.any(String),
			}),
		}));
	});
});
