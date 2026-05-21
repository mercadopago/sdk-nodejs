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
		expect(createPlan.reason).toBe(body.reason);
		expect(createPlan.auto_recurring.frequency).toBe(body.auto_recurring.frequency);
		expect(createPlan.auto_recurring.frequency_type).toBe(body.auto_recurring.frequency_type);
		expect(createPlan.auto_recurring.transaction_amount).toBe(body.auto_recurring.transaction_amount);
		expect(createPlan.auto_recurring.currency_id).toBe(body.auto_recurring.currency_id);
		expect(createPlan.back_url).toBe(body.back_url);
		expect(createPlan).toEqual(expect.objectContaining({
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
