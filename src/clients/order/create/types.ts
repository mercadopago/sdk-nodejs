import { Phone } from '../../../clients/commonTypes';
import { MercadoPagoConfig } from '../../../mercadoPagoConfig';
import { Options } from '../../../types';
import { Address, AutomaticPayments, Config, Identification, Item, StoredCredential, SubscriptionData, TransactionSecurity } from '../commonTypes';
export declare type OrderCreateClient = {
	body: CreateOrderRequest;
	config: MercadoPagoConfig;
};
export declare type OrderCreateData = {
	body: CreateOrderRequest;
	requestOptions?: Options;
};
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
	currency?: string;
	additional_info?: Record<string, any>;
};
export declare type TransactionsRequest = {
	payments?: PaymentRequest[];
};
export declare type PaymentRequest = {
	amount?: string;
	payment_method?: PaymentMethodRequest;
	automatic_payments?: AutomaticPayments;
	stored_credential?: StoredCredential;
	subscription_data?: SubscriptionData;
	expiration_time?: string;
};
export declare type PaymentMethodRequest = {
	id?: string;
	type?: string;
	token?: string;
	installments?: number;
	statement_descriptor?: string;
	transaction_security?: TransactionSecurity;
};
export declare type PayerRequest = {
	customer_id?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	identification?: Identification;
	phone?: Phone;
	address?: Address;
};

