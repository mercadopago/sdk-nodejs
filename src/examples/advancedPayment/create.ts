import MercadoPagoConfig, { AdvancedPayment } from '../../index';

const client = new MercadoPagoConfig({ accessToken: '<YOUR_ACCESS_TOKEN>' });
const advancedPayment = new AdvancedPayment(client);

advancedPayment.create({
	body: {
		application_id: '<YOUR_APPLICATION_ID>',
		payments: [
			{
				payment_method_id: 'master',
				payment_type_id: 'credit_card',
				token: '<CARD_TOKEN>',
				transaction_amount: 100,
				installments: 1,
				processing_mode: 'aggregator',
				description: 'Split payment example',
			}
		],
		disbursements: [
			{
				collector_id: 488656838,
				amount: 80,
				external_reference: 'SELLER-REF-001',
				application_fee: 2,
			}
		],
		payer: { email: 'buyer@example.com' },
		external_reference: 'ADV-001',
		capture: false,
	}
}).then(console.log).catch(console.error);
