// API version: 7d364c51-04c7-45e3-af61-f82423bcc39c

import { Phone } from '@src/clients/commonTypes';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';
import { Address, Config, Identification, Item } from '../commonTypes';

export declare type OrderCreateClient = {
	body: CreateOrderRequest;
	config: MercadoPagoConfig;
}

export declare type OrderCreateData = {
	body: CreateOrderRequest;
	requestOptions?: Options;
}

export declare type CreateOrderRequest = {
	type?: string;
	external_reference?: string;
	transactions?: TransactionsRequest;
	payer?: PayerRequest;
	total_amount?: string;
	capture_mode?: string;
	processing_mode?: string;
	description?: string;
	marketplace?: string;
	marketplace_fee?: string;
	items?: Item[];
	config?: Config;
	checkout_available_at?: string;
	expiration_time?: string;
}

export declare type TransactionsRequest = {
	payments?: PaymentRequest[];
}

export declare type PaymentRequest = {
	amount?: string;
	payment_method?: PaymentMethodRequest;
	automatic_payments?: AutomaticPaymentsRequest;
	stored_credential?: StoredCredentialRequest;
	subscription_data?: SubscriptionDataRequest;
	expiration_time?: string;
}

export declare type PaymentMethodRequest = {
	id?: string;
	type?: string;
	token?: string;
	installments?: number;
	statement_descriptor?: string;
}

export declare type PayerRequest = {
	customer_id?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	identification?: Identification;
	phone?: Phone;
	address?: Address;
}

export declare type AutomaticPaymentsRequest = {
	payment_profile_id?: string;
	retries?: number;
	schedule_date?: string;
	due_date?: string;
}

export declare type StoredCredentialRequest = {
	payment_initiator?: string;
	reason?: string;
	store_payment_method?: boolean;
	first_payment?: boolean;
}

export declare type SubscriptionDataRequest = {
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
