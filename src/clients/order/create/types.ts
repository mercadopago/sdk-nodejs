import { Phone } from '../../../clients/commonTypes';
import { MercadoPagoConfig } from '../../../mercadoPagoConfig';
import { Options } from '../../../types';
import { Address, AutomaticPayments, Config, Identification, Item, StoredCredential, SubscriptionData } from '../commonTypes';
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
	additional_info?: AdditionalInfo;
};
export declare type TransactionsRequest = {
	payments?: PaymentRequest[];
};
export interface AdditionalInfo {
	payer?: {
		authentication_type?: string;
		registration_date?: string;
		is_prime_user?: boolean;
		is_first_purchase_online?: boolean;
		last_purchase?: string;
	};
	shipment?: {
		express?: boolean;
		local_pickup?: boolean;
	};
	platform?: {
		shipment?: {
			delivery_promise?: string;
			drop_shipping?: string;
			safety?: string;
			tracking?: {
				code?: string;
				status?: string;
				withdrawn?: boolean;
			};
		};
		seller?: {
			id?: string;
			name?: string;
			email?: string;
			status?: string;
			referral_url?: string;
			registration_date?: string;
			hired_plan?: string;
			business_type?: string;
			address?: {
				zip_code?: string;
				street_name?: string;
				street_number?: string;
				city?: string;
				state?: string;
				complement?: string;
				country?: string;
			};
			identification?: {
				type?: string;
				number?: string;
			};
			phone?: {
				area_code?: string;
				number?: string;
			};
		};
		authentication?: string;
	};
	travel?: {
		passengers?: Array<{
			first_name: string;
			last_name: string;
			identification: {
				type: string;
				number: string;
			};
		}>;
		routes?: Array<{
			departure: string;
			destination: string;
			departure_date_time?: string;
			arrival_date_time?: string;
			company: string;
		}>;
	};
}
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

