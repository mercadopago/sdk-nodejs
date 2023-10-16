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

		const updateBody = {
			back_url: 'https://www.mercadopago.com.br/developers/',
			reason: 'yoga class update',
			auto_recurring:	{
				currency_id: 'BRL',
				transaction_amount: 20,
				frequency: 2,
				frequency_type: 'months'
			}
		};

		const updatePlan = await preApprovalPlan.update({ id: createPlan.id, updatePreApprovalPlanRequest: updateBody });
		expect(updatePlan.reason).toBe(updateBody.reason);
		expect(updatePlan.auto_recurring.frequency).toBe(updateBody.auto_recurring.frequency);
		expect(updatePlan.auto_recurring.frequency_type).toBe(updateBody.auto_recurring.frequency_type);
		expect(updatePlan.auto_recurring.transaction_amount).toBe(updateBody.auto_recurring.transaction_amount);
		expect(updatePlan.auto_recurring.currency_id).toBe(updateBody.auto_recurring.currency_id);
		expect(updatePlan.back_url).toBe(updateBody.back_url);
		expect(updatePlan).toEqual(expect.objectContaining({
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
