// API version: b950ae02-4f49-4686-9ad3-7929b21b6495

import { ApiResponse } from '@src/types';
import { Phone } from '../commonTypes';

export declare interface OrderResponse extends ApiResponse {
	id?: string;
	type?: string;
	external_reference?: string;
	country_code?: string;
	status?: string;
	status_detail?: string;
	capture_mode?: string;
	transactions?: TransactionsResponse;
	payer?: PayerResponse;
	total_amount?: string;
	processing_mode?: string;
	description?: string;
	marketplace?: string;
	marketplace_fee?: string;
	items?: Item[];
	created_date?: string;
	last_updated_date?: string;
	expiration_time?: string;
}

export declare type TransactionsResponse = {
	payments?: PaymentResponse[];
	refunds?: RefundResponse[];
}

export declare interface TransactionsApiResponse extends ApiResponse {
	payments?: PaymentResponse[];
	refunds?: RefundResponse[];
}

export declare type PaymentResponse = {
	id?: string;
	reference_id?: string;
	status?: string;
	status_detail?: string;
	amount?: string;
	payment_method?: PaymentMethodResponse;
}

export declare interface PaymentApiResponse extends ApiResponse {
	id?: string;
	amount?: string;
	payment_method?: PaymentMethodResponse;
}

export declare type PaymentMethodResponse = {
	id?: string;
	card_id?: string;
	type?: string;
	token?: string;
	issuer_id?: string;
	installments?: number;
	statement_descriptor?: string;
	external_resource_url?: string;
	barcode_content?: string;
	reference?: string;
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
}

export declare type PayerResponse = {
	email?: string;
	first_name?: string;
	last_name?: string;
	identification?: Identification;
	phone?: Phone;
	address?: Address;
}

export declare type Identification = {
	type?: string;
	number?: string;
}

export declare type Address = {
	street_name?: string;
	street_number?: string;
	zip_code?: string;
}

export declare type Item = {
	id?: string;
	title?: string;
	unit_price?: string;
	quantity?: number;
	category_id?: string;
	description?: string;
	picture_url?: string;
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
