// API version: acd67b14-97c4-4a4a-840d-0a018c09654f

import { ApiResponse } from '@src/types';
import { DifferentialPricing } from '../commonTypes';

export declare interface OrderResponse extends ApiResponse {
	id?: string;
	type?: string;
	external_reference?: string;
	country_code?: string;
	status?: string;
	status_detail?: string;
	user_id?: string;
	client_token?: string;
	capture_mode?: string;
	integration_data?: IntegrationDataResponse;
	payer?: PayerResponse;
	transactions?: TransactionsResponse;
	total_amount?: string;
	total_paid_amount?: string;
	processing_mode?: string;
	description?: string;
	marketplace?: string;
	marketplace_fee?: string;
	items?: Item[];
	config?: Config;
	checkout_available_at?: string;
	created_date?: string;
	last_updated_date?: string;
	expiration_time?: string;
}

export declare type PayerResponse = {
	customer_id?: string;
}

export declare type Config = {
	payment_method?: PaymentMethodConfig;
	online?: OnlineConfig;
}

export declare type PaymentMethodConfig = {
	not_allowed_ids?: string[];
	not_allowed_types?: string[];
	default_id?: string;
	max_installments?: number;
	default_installments?: number;
}

export declare type OnlineConfig = {
	callback_url?: string;
	success_url?: string;
	pending_url?: string;
	failure_url?: string;
	auto_return_url?: string;
	differential_pricing?: DifferentialPricing;
}

export declare type IntegrationDataResponse = {
	corporation_id?: string;
	application_id?: string;
	integrator_id?: string;
	platform_id?: string;
	sponsor?: SponsorResponse;
}

export declare type SponsorResponse = {
	id?: string;
}

export declare type TransactionsResponse = {
	payments?: PaymentResponse[];
	refunds?: RefundResponse[];
}

export declare interface TransactionsApiResponse extends ApiResponse {
	payments?: PaymentResponse[];
}

export declare type PaymentResponse = {
	id?: string;
	reference_id?: string;
	status?: string;
	status_detail?: string;
	attempt_number?: number;
	attempts?: Attempt[];
	amount?: string;
	paid_amount?: string;
	payment_method?: PaymentMethodResponse;
	automatic_payments?: AutomaticPayments;
	stored_credential?: StoredCredential;
	subscription_data?: SubscriptionData;
	date_of_expiration?: string;
	expiration_time?: string;
}

export declare type AutomaticPayments = {
	payment_profile_id?: string;
	retries?: number;
	schedule_date?: string;
	due_date?: string;
}

export declare type StoredCredential = {
	payment_initiator?: string;
	reason?: string;
	store_payment_method?: boolean;
	first_payment?: boolean;
}

export declare type SubscriptionData = {
	subscription_sequence?: SubscriptionSequence;
	invoice_id?: string;
	invoice_period?: InvoicePeriod;
	billing_date?: string;
}

export declare type SubscriptionSequence = {
	number?: number;
	total?: number;
}

export declare type InvoicePeriod = {
	type?: string;
	period?: number;
}

export declare type Attempt = {
	id?: string;
	status?: string;
	status_detail?: string;
	payment_method?: PaymentMethodResponse;
}

export declare interface PaymentApiResponse extends ApiResponse {
	payment_method?: PaymentMethodResponse;
}

export declare type PaymentMethodResponse = {
	id?: string;
	card_id?: string;
	type?: string;
	token?: string;
	installments?: number;
	statement_descriptor?: string;
	ticket_url?: string;
	barcode_content?: string;
	reference?: string;
	reference_id?: string;
	verification_code?: string;
	financial_institution?: string;
	qr_code?: string;
	qr_code_base64?: string;
	digitable_line?: string;
}

export declare type RefundResponse = {
	id?: string;
	transaction_id?: string;
	reference_id?: string;
	amount?: string;
	status?: string;
	items?: Item[];
}

export declare type Identification = {
	type?: string;
	number?: string;
}

export declare type Address = {
	street_name?: string;
	street_number?: string;
	zip_code?: string;
	neighborhood?: string;
	state?: string;
	city?: string;
	complement?: string;
	country?: string;
}

export declare type Item = {
	title?: string;
	unit_price?: string;
	quantity?: number;
	external_code?: string;
	category_id?: string;
	type?: string;
	description?: string;
	picture_url?: string;
	warranty?: boolean;
	event_date?: string;
}

export declare type PaymentRequest = {
	amount?: string;
	payment_method?: PaymentMethodRequest;
}

export declare type PaymentMethodRequest = {
	id?: string;
	type?: string;
	token?: string;
	installments?: number;
	statement_descriptor?: string;
}
