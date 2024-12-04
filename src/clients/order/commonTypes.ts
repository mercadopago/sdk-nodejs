// API version: 5d077b6f-61b2-4b3a-8333-7a64ee547448

import { ApiResponse } from '@src/types';
import { Phone } from '../commonTypes';

export declare interface OrderResponse extends ApiResponse {
	id?: string;
	type?: string;
	external_reference?: string;
	site_id?: string;
	created_date?: string;
	last_updated_date?: string;
	status?: string;
	status_detail?: string;
	transactions?: TransactionsResponse;
	payer?: PayerResponse;
	type_config?: TypeConfig;
	total_amount?: string;
	processing_mode?: string;
	description?: string;
	marketplace?: string;
	marketplace_fee?: string;
	items?: Item[];
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
	amount?: string;
	status?: string;
	status_detail?: string;
	payment_method?: PaymentMethodResponse;
}

export declare type PaymentMethodResponse = {
	id?: string;
	type?: string;
	card_id?: string;
	token?: string;
	installments?: number;
	issuer_id?: string;
	statement_descriptor?: string;
	external_resource_url?: string;
	barcode_content?: string;
	reference?: string;
	verification_code?: string;
	financial_institution?: string;
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
}

export declare type TypeConfig = {
	capture_mode?: string;
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
