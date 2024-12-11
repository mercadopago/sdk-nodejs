// API version: b950ae02-4f49-4686-9ad3-7929b21b6495

import { Phone } from '@src/clients/commonTypes';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';
import { Address, Identification, Item } from '../commonTypes';

export declare type OrderCreateClient = {
	body: CreateOrderRequest,
	config: MercadoPagoConfig
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
	expiration_time?: string;
}

export declare type TransactionsRequest = {
	payments?: PaymentRequest[];
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

export declare type PayerRequest = {
	email?: string;
	first_name?: string;
	last_name?: string;
	identification?: Identification;
	phone?: Phone;
	address?: Address;
}
