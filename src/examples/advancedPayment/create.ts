import { MercadoPagoConfig, AdvancedPayment } from '../../index';

const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });
const advancedPayment = new AdvancedPayment(client);

const body = {
	application_id: 'YOUR_APPLICATION_ID',
	payments: [
		{
			payment_method_id: 'visa',
			payment_type_id: 'credit_card',
			token: 'CARD_TOKEN',
			installments: 1,
			amount: 100,
			processing_mode: 'aggregator',
			description: 'Payment for advanced payment',
			capture: true,
			payer: {
				email: 'test_user_123456@testuser.com'
			}
		}
	],
	disbursements: [
		{
			amount: 80,
			external_reference: 'seller_op_ref',
			collector_id: 'SELLER_USER_ID',
			application_fee: 20,
			money_release_days: 3
		}
	],
	payer: {
		email: 'test_user_123456@testuser.com'
	},
	external_reference: 'ext_ref_12345',
	description: 'Advanced Payment Example',
	binary_mode: false,
	capture: true
};

advancedPayment.create({ body }).then((result) => console.log(result)).catch((error) => console.error(error)); 