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
	additional_info?: AdditionalInfoRequest;
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

export declare type AdditionalInfoRequest = {
	payer?: AdditionalInfoPayerRequest;
	shipment?: AdditionalInfoShipmentRequest;
	platform?: AdditionalInfoPlatformRequest;
	travel?: AdditionalInfoTravelRequest;
}

export declare type AdditionalInfoPayerRequest = {
	authentication_type?: string;
	registration_date?: string;
	is_prime_user?: boolean;
	is_first_purchase_online?: boolean;
	last_purchase?: string;
	address?: Address;
}

export declare type AdditionalInfoShipmentRequest = {
	express?: boolean;
	local_pickup?: boolean;
}

export declare type AdditionalInfoPlatformRequest = {
	shipment?: PlatformShipmentRequest;
	seller?: PlatformSellerRequest;
	authentication?: string;
}

export declare type PlatformShipmentRequest = {
	delivery_promise?: string;
	drop_shipping?: string;
	safety?: string;
	tracking?: ShipmentTrackingRequest;
	withdrawn?: boolean;
}

export declare type ShipmentTrackingRequest = {
	code?: string;
	status?: string;
}

export declare type PlatformSellerRequest = {
	id?: string;
	name?: string;
	email?: string;
	status?: string;
	referral_url?: string;
	registration_date?: string;
	hired_plan?: string;
	business_type?: string;
	address?: Address;
	identification?: Identification;
	phone?: Phone;
}

export declare type AdditionalInfoTravelRequest = {
	passengers?: PassengerRequest[];
	routes?: RouteRequest[];
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
