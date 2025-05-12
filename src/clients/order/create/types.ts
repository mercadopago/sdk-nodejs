// API version: 7d364c51-04c7-45e3-af61-f82423bcc39c

import { Phone } from '@src/clients/commonTypes';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';
import { Address, AutomaticPayments, Config, Identification, Item, StoredCredential, SubscriptionData } from '../commonTypes';

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
	additional_info?: {
		'payer.authentication_type'?: string;
		'payer.registration_date'?: string;
		'payer.is_prime_user'?: boolean;
		'payer.is_first_purchase_online'?: boolean;
		'payer.last_purchase'?: string;
		'payer.address'?: Address;
		'shipment.express'?: boolean;
		'shipment.local_pickup'?: boolean;
		'platform.shipment.delivery_promise'?: string;
		'platform.shipment.drop_shipping'?: string;
		'platform.shipment.safety'?: string;
		'platform.shipment.tracking.code'?: string;
		'platform.shipment.tracking.status'?: string;
		'platform.shipment.withdrawn'?: boolean;
		'platform.seller.id'?: string;
		'platform.seller.name'?: string;
		'platform.seller.email'?: string;
		'platform.seller.status'?: string;
		'platform.seller.referral_url'?: string;
		'platform.seller.registration_date'?: string;
		'platform.seller.hired_plan'?: string;
		'platform.seller.business_type'?: string;
		'platform.seller.address'?: Address;
		'platform.seller.identification.type'?: string;
		'platform.seller.identification.number'?: string;
		'platform.seller.phone.area_code'?: string;
		'platform.seller.phone.number'?: string;
		'platform.authentication'?: string;
		'travel.passengers'?: PassengerRequest[];
		'travel.routes'?: RouteRequest[];
	};
}

export declare type TransactionsRequest = {
	payments?: PaymentRequest[];
}

export declare type PaymentRequest = {
	amount?: string;
	payment_method?: PaymentMethodRequest;
	automatic_payments?: AutomaticPayments;
	stored_credential?: StoredCredential;
	subscription_data?: SubscriptionData;
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
	entity_type?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	identification?: Identification;
	phone?: Phone;
	address?: Address;
}

export declare type PassengerRequest = {
	first_name?: string;
	last_name?: string;
	identification?: Identification;
}

export declare type RouteRequest = {
	departure?: string;
	destination?: string;
	departure_date_time?: string;
	arrival_date_time?: string;
	company?: string;
}
