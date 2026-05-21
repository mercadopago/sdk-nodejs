/**
 * Shared response and domain types for the Orders API.
 *
 * Every type in this file mirrors the JSON shape returned by (or sent
 * to) the MercadoPago Orders v1 endpoints. Request-specific types live
 * in each operation's own `types.ts` file, while these shared types are
 * reused across multiple operations.
 *
 * @module clients/order/commonTypes
 */

// API version: acd67b14-97c4-4a4a-840d-0a018c09654f

import { ApiResponse } from '@src/types';
import { DifferentialPricing } from '../commonTypes';

/**
 * Full order representation returned by most Orders API endpoints.
 *
 * Extends {@link ApiResponse} so callers can always inspect the raw
 * HTTP status and headers alongside the order payload.
 */
export declare interface OrderResponse extends ApiResponse {
	/** Unique order identifier assigned by MercadoPago. */
	id?: string;
	/** Order type (e.g. `online`). */
	type?: string;
	/** Integrator-defined external reference for reconciliation. */
	external_reference?: string;
	/** ISO 3166-1 alpha-2 country code where the order was created. */
	country_code?: string;
	/** Current order status (e.g. `created`, `processed`, `cancelled`). */
	status?: string;
	/** Granular status detail providing additional context on the status. */
	status_detail?: string;
	/** MercadoPago user ID of the order owner. */
	user_id?: string;
	/** Client token used for frontend SDK operations (e.g. card tokenization). */
	client_token?: string;
	/** Payment capture strategy: `automatic` or `manual`. */
	capture_mode?: string;
	/** Integration metadata (corporation, application, integrator IDs). */
	integration_data?: IntegrationDataResponse;
	/** Payer information associated with this order. */
	payer?: PayerResponse;
	/** Payment, refund, and chargeback transactions linked to the order. */
	transactions?: TransactionsResponse;
	/** Total order amount as a decimal string. */
	total_amount?: string;
	/** Amount already collected from the payer as a decimal string. */
	total_paid_amount?: string;
	/** Processing mode (e.g. `aggregator`, `gateway`). */
	processing_mode?: string;
	/** Human-readable order description. */
	description?: string;
	/** Marketplace identifier when the order originates from a marketplace. */
	marketplace?: string;
	/** Fee charged by the marketplace as a decimal string. */
	marketplace_fee?: string;
	/** Line items included in the order. */
	items?: Item[];
	/** Payment method and checkout configuration for this order. */
	config?: Config;
	/** ISO 8601 date-time from which the checkout becomes available. */
	checkout_available_at?: string;
	/** ISO 8601 date-time when the order was created. */
	created_date?: string;
	/** ISO 8601 date-time of the most recent update. */
	last_updated_date?: string;
	/** ISO 8601 duration or date-time controlling order expiration. */
	expiration_time?: string;
	/** ISO 4217 currency code (e.g. `BRL`, `ARS`, `MXN`). */
	currency?: string;
	/** Tax lines applied to the order. */
	taxes?: TaxResponse[];
	/** Discount information applied at the order level. */
	discounts?: DiscountsResponse;
	/** Additional response metadata (e.g. QR code data). */
	type_response?: TypeResponse;
}

/**
 * Payer details as returned by the Orders API.
 */
export declare type PayerResponse = {
	/** MercadoPago customer ID linked to the payer. */
	customer_id?: string;
	/** Entity type of the payer (e.g. `individual`, `association`). */
	entity_type?: string;
}

/**
 * Order-level configuration controlling payment methods and checkout behaviour.
 */
export declare type Config = {
	/** Allowed / disallowed payment method rules and installment settings. */
	payment_method?: PaymentMethodConfig;
	/** Online checkout configuration (redirect URLs, differential pricing, 3DS). */
	online?: OnlineConfig;
}

/**
 * Payment method constraints and installment configuration for an order.
 */
export declare type PaymentMethodConfig = {
	/** Payment method IDs the buyer is not allowed to use. */
	not_allowed_ids?: string[];
	/** Payment method types the buyer is not allowed to use (e.g. `credit_card`). */
	not_allowed_types?: string[];
	/** Pre-selected payment method ID shown to the buyer. */
	default_id?: string;
	/** Maximum number of installments the buyer may choose. */
	max_installments?: number;
	/** Pre-selected installment count. */
	default_installments?: number;
	/** Pre-selected payment method type. */
	default_type?: string;
	/** Who absorbs the installment cost (`seller` or `buyer`). */
	installments_cost?: string;
	/** Detailed installment availability configuration. */
	installments?: InstallmentsResponse;
	/** Minimum number of installments allowed. */
	min_installments?: number;
}

/**
 * Online checkout configuration for redirect-based flows.
 */
export declare type OnlineConfig = {
	/** URL notified via webhook when the payment status changes. */
	callback_url?: string;
	/** URL the buyer is redirected to after a successful payment. */
	success_url?: string;
	/** URL the buyer is redirected to when the payment is pending. */
	pending_url?: string;
	/** URL the buyer is redirected to after a failed payment. */
	failure_url?: string;
	/** URL the buyer is automatically redirected to after checkout. */
	auto_return_url?: string;
	/** Differential pricing configuration for marketplace splits. */
	differential_pricing?: DifferentialPricing;
	/** 3-D Secure transaction security settings. */
	transaction_security?: TransactionSecurity;
}

/**
 * Integration metadata identifying the integrator, application, and platform.
 */
export declare type IntegrationDataResponse = {
	/** Corporation identifier for multi-account setups. */
	corporation_id?: string;
	/** MercadoPago application ID that created the order. */
	application_id?: string;
	/** Certified integrator identifier. */
	integrator_id?: string;
	/** Platform identifier assigned by MercadoPago. */
	platform_id?: string;
	/** Sponsor (marketplace owner) information. */
	sponsor?: SponsorResponse;
}

/**
 * Sponsor (marketplace owner) associated with the integration.
 */
export declare type SponsorResponse = {
	/** MercadoPago user ID of the sponsor. */
	id?: string;
}

/**
 * Container for all financial transactions associated with an order.
 */
export declare type TransactionsResponse = {
	/** Payment attempts and their current statuses. */
	payments?: PaymentResponse[];
	/** Refunds issued against payments in this order. */
	refunds?: RefundResponse[];
	/** Chargebacks filed against payments in this order. */
	chargebacks?: ChargebackResponse[];
}

/**
 * Response returned when creating or listing transactions on an order.
 *
 * Extends {@link ApiResponse} so raw HTTP metadata is always accessible.
 */
export declare interface TransactionsApiResponse extends ApiResponse {
	/** Payment transactions attached to the order. */
	payments?: PaymentResponse[];
}

/**
 * Individual payment transaction within an order.
 */
export declare type PaymentResponse = {
	/** Unique payment transaction identifier. */
	id?: string;
	/** Integrator-assigned reference for this specific payment. */
	reference_id?: string;
	/** Current payment status (e.g. `approved`, `rejected`, `pending`). */
	status?: string;
	/** Granular reason for the current status (e.g. `accredited`, `cc_rejected_other_reason`). */
	status_detail?: string;
	/** Sequential attempt counter for this payment. */
	attempt_number?: number;
	/** History of processing attempts for this payment. */
	attempts?: Attempt[];
	/** Requested payment amount as a decimal string. */
	amount?: string;
	/** Amount actually collected from the payer as a decimal string. */
	paid_amount?: string;
	/** Total amount refunded for this payment as a decimal string. */
	refunded_amount?: string;
	/** Payment provider or acquirer identifier. */
	provider?: string;
	/** Payment method details (card, ticket, bank transfer, etc.). */
	payment_method?: PaymentMethodResponse;
	/** Automatic / recurring payment configuration. */
	automatic_payments?: AutomaticPayments;
	/** Stored credential (card-on-file) metadata for recurring payments. */
	stored_credential?: StoredCredential;
	/** Subscription billing data when the payment is part of a subscription. */
	subscription_data?: SubscriptionData;
	/** ISO 8601 date-time after which the payment can no longer be collected. */
	date_of_expiration?: string;
	/** ISO 8601 duration or date-time controlling payment expiration. */
	expiration_time?: string;
	/** Discounts applied at the payment level. */
	discounts?: DiscountResponse[];
}

/**
 * Automatic (recurring) payment settings for subscription-style charges.
 */
export declare type AutomaticPayments = {
	/** Identifier of the automatic payment profile. */
	payment_profile_id?: string;
	/** Maximum number of retry attempts on failure. */
	retries?: number;
	/** ISO 8601 date when the automatic charge is scheduled. */
	schedule_date?: string;
	/** ISO 8601 due date for the payment. */
	due_date?: string;
}

/**
 * Card-on-file / stored credential metadata for recurring or one-click payments.
 */
export declare type StoredCredential = {
	/** Who initiates the payment: `cardholder` or `merchant`. */
	payment_initiator?: string;
	/** Reason for storing the credential (e.g. `recurring`, `unscheduled`). */
	reason?: string;
	/** Whether to save the payment method for future use. */
	store_payment_method?: boolean;
	/** Whether this is the initial payment in a stored-credential series. */
	first_payment?: boolean;
}

/**
 * Subscription billing information when a payment belongs to a recurring plan.
 */
export declare type SubscriptionData = {
	/** Position of this payment within the subscription lifecycle. */
	subscription_sequence?: SubscriptionSequence;
	/** Identifier of the invoice being settled by this payment. */
	invoice_id?: string;
	/** Billing period covered by this invoice. */
	invoice_period?: InvoicePeriod;
	/** ISO 8601 date when the subscription billing was triggered. */
	billing_date?: string;
}

/**
 * Sequence position of a payment within a subscription plan.
 */
export declare type SubscriptionSequence = {
	/** Current payment number in the subscription (1-based). */
	number?: number;
	/** Total number of payments expected in the subscription plan. */
	total?: number;
}

/**
 * Billing period for a subscription invoice.
 */
export declare type InvoicePeriod = {
	/** Period unit (e.g. `monthly`, `yearly`, `daily`). */
	type?: string;
	/** Number of period units covered by this invoice. */
	period?: number;
}

/**
 * Single processing attempt for a payment transaction.
 *
 * Each retry or re-submission creates a new attempt record.
 */
export declare type Attempt = {
	/** Unique attempt identifier. */
	id?: string;
	/** Outcome status of this attempt (e.g. `approved`, `rejected`). */
	status?: string;
	/** Granular reason for the attempt outcome. */
	status_detail?: string;
	/** Payment method used in this attempt. */
	payment_method?: PaymentMethodResponse;
}

/**
 * Response returned when updating a single payment transaction.
 *
 * Extends {@link ApiResponse} so raw HTTP metadata is always accessible.
 */
export declare interface PaymentApiResponse extends ApiResponse {
	/** Payment method details after the update. */
	payment_method?: PaymentMethodResponse;
}

/**
 * Payment method details as returned by the API.
 *
 * Fields vary depending on the method type (card, ticket, bank transfer, PIX, etc.).
 */
export declare type PaymentMethodResponse = {
	/** Payment method identifier (e.g. `visa`, `pix`, `bolbradesco`). */
	id?: string;
	/** Saved card identifier when a stored card was used. */
	card_id?: string;
	/** Payment method type (e.g. `credit_card`, `debit_card`, `ticket`, `bank_transfer`). */
	type?: string;
	/** Tokenized card data used for this payment. */
	token?: string;
	/** Number of installments selected by the buyer. */
	installments?: number;
	/** Text that appears on the buyer's card statement. */
	statement_descriptor?: string;
	/** URL where the buyer can view or print the payment ticket (boleto). */
	ticket_url?: string;
	/** Barcode content for ticket-based payment methods. */
	barcode_content?: string;
	/** Payment reference code shown to the buyer. */
	reference?: string;
	/** Integrator-assigned reference for reconciliation. */
	reference_id?: string;
	/** Verification code for the payment (e.g. CVV response). */
	verification_code?: string;
	/** Financial institution processing the payment. */
	financial_institution?: string;
	/** PIX QR code payload string (copy-and-paste format). */
	qr_code?: string;
	/** Base64-encoded PIX QR code image. */
	qr_code_base64?: string;
	/** Digitable line for boleto payment slips. */
	digitable_line?: string;
	/** End-to-end transaction identifier (used in PIX and bank transfers). */
	e2e_id?: string;
	/** URL where the buyer is redirected to complete the payment (e.g. 3DS challenge). */
	redirect_url?: string;
	/** 3-D Secure transaction security details for this payment. */
	transaction_security?: TransactionSecurityResponse;
}

/**
 * Refund record within an order's transactions.
 */
export declare type RefundResponse = {
	/** Unique refund identifier. */
	id?: string;
	/** Identifier of the original payment transaction being refunded. */
	transaction_id?: string;
	/** Integrator-assigned reference for reconciliation. */
	reference_id?: string;
	/** Refunded amount as a decimal string. */
	amount?: string;
	/** Current refund status (e.g. `approved`, `pending`). */
	status?: string;
	/** Line items associated with this refund (partial refund context). */
	items?: Item[];
	/** End-to-end identifier for the refund movement (e.g. PIX). */
	e2e_id?: string;
}

/**
 * Personal or business identification document for the payer.
 */
export declare type Identification = {
	/** Document type code (e.g. `CPF`, `DNI`, `CNPJ`). */
	type?: string;
	/** Document number as a string to preserve leading zeros. */
	number?: string;
}

/**
 * Full postal address used in payer and shipment contexts.
 */
export declare type Address = {
	/** Street name. */
	street_name?: string;
	/** Street number. */
	street_number?: string;
	/** Postal / ZIP code. */
	zip_code?: string;
	/** Neighbourhood or district name. */
	neighborhood?: string;
	/** State or province. */
	state?: string;
	/** City name. */
	city?: string;
	/** Additional address detail (apartment, floor, etc.). */
	complement?: string;
	/** Country name or ISO code. */
	country?: string;
}

/**
 * Line item representing a product or service within an order.
 */
export declare type Item = {
	/** Short human-readable title shown to the buyer. */
	title?: string;
	/** Price per unit as a decimal string. */
	unit_price?: string;
	/** Number of units being purchased. */
	quantity?: number;
	/** Integrator-defined product or SKU code. */
	external_code?: string;
	/** MercadoPago category identifier (used for fraud analysis). */
	category_id?: string;
	/** Item type classification. */
	type?: string;
	/** Extended description of the item. */
	description?: string;
	/** URL of the item image. */
	picture_url?: string;
	/** Whether the item carries a warranty. */
	warranty?: boolean;
	/** Date of the event or service in ISO 8601 format. */
	event_date?: string;
	/** Unit of measurement (e.g. `unit`, `kg`, `pack`). */
	unit_measure?: string;
	/** External category associations for this item. */
	external_categories?: ExternalCategoryResponse[];
}

/**
 * Minimal payment data used when adding or updating a transaction on an existing order.
 */
export declare type PaymentRequest = {
	/** Payment amount as a decimal string. */
	amount?: string;
	/** Payment method specification for this transaction. */
	payment_method?: PaymentMethodRequest;
}

/**
 * Payment method specification included in a transaction request.
 */
export declare type PaymentMethodRequest = {
	/** Payment method identifier (e.g. `visa`, `pix`, `bolbradesco`). */
	id?: string;
	/** Payment method type (e.g. `credit_card`, `debit_card`, `ticket`). */
	type?: string;
	/** Tokenized card data obtained from the MercadoPago.js SDK. */
	token?: string;
	/** Number of installments selected by the buyer. */
	installments?: number;
	/** Text that appears on the buyer's card statement. */
	statement_descriptor?: string;
}

/**
 * 3-D Secure transaction security settings sent in payment requests.
 */
export declare type TransactionSecurity = {
	/** When to trigger 3DS validation. */
	validation?: 'always' | 'on_fraud_risk' | 'never';
	/** Whether the liability shift to the issuer is required or merely preferred. */
	liability_shift?: 'required' | 'preferred';
}

/**
 * 3-D Secure transaction security details returned in payment responses.
 */
export declare type TransactionSecurityResponse = {
	/** Unique identifier of the 3DS security challenge. */
	id?: string;
	/** Validation mode that was applied. */
	validation?: 'always' | 'on_fraud_risk' | 'never';
	/** Liability shift preference that was applied. */
	liability_shift?: 'required' | 'preferred';
	/** URL the buyer must visit to complete the 3DS challenge. */
	url?: string;
	/** 3DS challenge type (e.g. `challenge`, `frictionless`). */
	type?: string;
	/** 3DS challenge status (e.g. `pending`, `complete`). */
	status?: string;
}

/**
 * Additional response metadata specific to the order type.
 */
export declare type TypeResponse = {
	/** QR code payload data (used for in-store / point-of-sale orders). */
	qr_data?: string;
}

/**
 * Tax line applied to an order.
 */
export declare type TaxResponse = {
	/** Fiscal condition of the payer for this tax. */
	payer_condition?: string;
	/** Tax type (e.g. `IVA`, `ISR`). */
	type?: string;
	/** Tax amount as a decimal string. */
	value?: string;
}

/**
 * Order-level discounts grouped by payment method.
 */
export declare type DiscountsResponse = {
	/** Discount details per payment method type. */
	payment_methods?: DiscountPaymentMethodResponse[];
}

/**
 * Discount applied when a specific payment method type is used.
 */
export declare type DiscountPaymentMethodResponse = {
	/** Payment method type this discount applies to. */
	type?: string;
	/** Revised total order amount after applying the discount. */
	new_total_amount?: string;
}

/**
 * Discount applied at the individual payment level.
 */
export declare type DiscountResponse = {
	/** Discount type identifier. */
	type?: string;
}

/**
 * Installment availability and interest-free configuration.
 */
export declare type InstallmentsResponse = {
	/** Interest-free installment plan details. */
	interest_free?: InstallmentsInterestFreeResponse;
	/** General installment availability settings. */
	available?: InstallmentsAvailableResponse;
}

/**
 * Interest-free installment plan configuration.
 */
export declare type InstallmentsInterestFreeResponse = {
	/** Strategy type for applying interest-free installments. */
	type?: string;
	/** Specific installment counts that qualify for zero interest. */
	values?: number[];
}

/**
 * General installment availability settings.
 */
export declare type InstallmentsAvailableResponse = {
	/** Availability strategy type for installments. */
	type?: string;
}

/**
 * Chargeback record filed against a payment in the order.
 */
export declare type ChargebackResponse = {
	/** Unique chargeback identifier. */
	id?: string;
	/** Identifier of the payment transaction being disputed. */
	transaction_id?: string;
	/** Dispute case identifier assigned by the card network or MercadoPago. */
	case_id?: string;
	/** Current chargeback status (e.g. `opened`, `closed`). */
	status?: string;
	/** Reference codes associated with this chargeback. */
	references?: string[];
}

/**
 * External category association for an order line item.
 */
export declare type ExternalCategoryResponse = {
	/** External category identifier. */
	id?: string;
}
