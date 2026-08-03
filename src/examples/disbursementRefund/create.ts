import MercadoPagoConfig, { DisbursementRefund } from '../../index';

const client = new MercadoPagoConfig({ accessToken: '<YOUR_ACCESS_TOKEN>' });
const disbursementRefund = new DisbursementRefund(client);

// Refund a specific disbursement by amount
disbursementRefund.create({
	advancedPaymentId: '<ADVANCED_PAYMENT_ID>',
	disbursementId: '<DISBURSEMENT_ID>',
	body: { amount: 50 }
}).then(console.log).catch(console.error);
