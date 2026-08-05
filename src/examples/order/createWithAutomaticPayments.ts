/**
 * Mercado Pago Create Order — Automatic Payments (recurring charges).
 *
 * Demonstrates the two-step Automatic Payments flow:
 *   1. First payment  — CVV-validated charge that registers the card credential.
 *   2. Recurring charge — subsequent MIT charge without CVV, referencing step 1.
 *
 * Prerequisites:
 *   - A customer created via POST /v1/customers             → CUSTOMER_ID
 *   - A payment profile created via POST /v1/customers/{id}/payment-profiles → PAYMENT_PROFILE_ID
 *
 * @see {@link https://mercadopago.com/developers/en/docs/automatic-payments-orders/overview Documentation}
 */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

// ── Step 1: First payment ─────────────────────────────────────────────────────
// Registers the card credential with first_payment: true.
// No previous_transaction_reference is needed on the first charge.
order.create({
	body: {
		type: 'online',
		processing_mode: 'automatic',
		total_amount: '100.00',
		external_reference: 'subscription-001-payment-1',
		payer: {
			email: '<PAYER_EMAIL>',
			customer_id: '<CUSTOMER_ID>',
		},
		transactions: {
			payments: [
				{
					amount: '100.00',
					payment_method: {
						id: 'master',
						type: 'credit_card',
						token: '<CARD_TOKEN>',
						installments: 1,
					},
					automatic_payments: {
						payment_profile_id: '<PAYMENT_PROFILE_ID>',
					},
					stored_credential: {
						payment_initiator: 'customer',
						reason: 'recurring',
						first_payment: true,
					},
				},
			],
		},
	},
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY_FIRST>',
	},
}).then((firstOrder) => {
	console.log('First payment order ID:', firstOrder.id);
	console.log('Status:', firstOrder.status);

	// Save the payment ID to use as previous_transaction_reference in the next charge.
	const firstPaymentId = firstOrder.transactions?.payments?.[0]?.id;
	if (!firstPaymentId) {
		console.error('Could not retrieve first payment ID.');
		return;
	}
	console.log('First payment ID (save for next charge):', firstPaymentId);

	// ── Step 2: Recurring charge ──────────────────────────────────────────────
	// Subsequent MIT charge — no card token needed, uses the payment profile.
	// previous_transaction_reference links this charge to the original authorization.
	return order.create({
		body: {
			type: 'online',
			processing_mode: 'automatic_async',
			total_amount: '100.00',
			external_reference: 'subscription-001-payment-2',
			payer: {
				email: '<PAYER_EMAIL>',
				customer_id: '<CUSTOMER_ID>',
			},
			transactions: {
				payments: [
					{
						amount: '100.00',
						automatic_payments: {
							payment_profile_id: '<PAYMENT_PROFILE_ID>',
							retries: 3,
							schedule_date: '2026-09-01T00:00:00.000-04:00',
							due_date: '2026-09-05T00:00:00.000-04:00',
						},
						stored_credential: {
							payment_initiator: 'merchant',
							reason: 'recurring',
							first_payment: false,
							previous_transaction_reference: firstPaymentId,
						},
						subscription_data: {
							invoice_id: 'INV-002',
							billing_date: '2026-08-01',
							subscription_sequence: { number: 2, total: 12 },
							invoice_period: { type: 'monthly', period: 1 },
						},
					},
				],
			},
		},
		requestOptions: {
			idempotencyKey: '<IDEMPOTENCY_KEY_RECURRING>',
		},
	});
}).then((recurringOrder) => {
	if (!recurringOrder) return;
	console.log('\nRecurring charge order ID:', recurringOrder.id);
	console.log('Status:', recurringOrder.status);
	console.log('Status detail:', recurringOrder.status_detail);
}).catch(console.error);
