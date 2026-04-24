/**
 * Request and internal-client types for the create order operation.
 *
 * @module clients/order/create/types
 */

import { Phone } from '../../../clients/commonTypes';
import { MercadoPagoConfig } from '../../../mercadoPagoConfig';
import { Options } from '../../../types';
import { Address, AutomaticPayments, Config, Identification, Item, StoredCredential, SubscriptionData, TransactionSecurity } from '../commonTypes';

/**
 * Internal client payload passed to the create order REST call.
 */
export declare type OrderCreateClient = {
	/** Order creation request body. */
	body: CreateOrderRequest;
	/** SDK configuration (access token, default options). */
	config: MercadoPagoConfig;
};

/**
 * Public-facing input for {@link Order.create}.
 */
export declare type OrderCreateData = {
	/** Order creation request body. */
	body: CreateOrderRequest;
	/** Per-call request options (timeout, idempotency key, etc.). */
	requestOptions?: Options;
};

/**
 * Request body for creating a new order.
 *
 * At minimum `total_amount` and at least one payment transaction or
 * line item should be provided.
 */
export declare type CreateOrderRequest = {
	/** Order type (e.g. `online`). */
	type?: string;
	/** Integrator-defined external reference for reconciliation. */
	external_reference?: string;
	/** Payment transactions to attach to the order at creation time. */
	transactions?: TransactionsRequest;
	/** Buyer (payer) information. */
	payer?: PayerRequest;
	/** Total order amount as a decimal string. */
	total_amount?: string;
	/** Payment capture strategy: `automatic` (default) or `manual`. */
	capture_mode?: string;
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
	/** Payment method and checkout configuration. */
	config?: Config;
	/** ISO 8601 date-time from which the checkout becomes available. */
	checkout_available_at?: string;
	/** ISO 8601 duration or date-time controlling order expiration. */
	expiration_time?: string;
	/** ISO 4217 currency code (e.g. `BRL`, `ARS`, `MXN`). */
	currency?: string;
	/** Free-form additional information for fraud prevention or analytics. */
	additional_info?: Record<string, any>;
	/** Shipping details for physical-goods orders. */
	shipment?: ShipmentRequest;
};

/**
 * Payment transactions to include when creating an order.
 */
export declare type TransactionsRequest = {
	/** One or more payment entries. */
	payments?: PaymentRequest[];
};

/**
 * Individual payment within the order creation request.
 */
export declare type PaymentRequest = {
	/** Payment amount as a decimal string. */
	amount?: string;
	/** Payment method specification (card token, type, installments). */
	payment_method?: PaymentMethodRequest;
	/** Automatic / recurring payment configuration. */
	automatic_payments?: AutomaticPayments;
	/** Stored credential (card-on-file) metadata for recurring payments. */
	stored_credential?: StoredCredential;
	/** Subscription billing data when the payment belongs to a plan. */
	subscription_data?: SubscriptionData;
	/** ISO 8601 duration or date-time controlling payment expiration. */
	expiration_time?: string;
};

/**
 * Payment method details for a payment within the create order request.
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
	/** 3-D Secure transaction security settings. */
	transaction_security?: TransactionSecurity;
};

/**
 * Payer (buyer) information included in the order creation request.
 */
export declare type PayerRequest = {
	/** MercadoPago customer ID if the buyer is a known customer. */
	customer_id?: string;
	/** Buyer's email address. */
	email?: string;
	/** Buyer's first name. */
	first_name?: string;
	/** Buyer's last name. */
	last_name?: string;
	/** Government-issued identification document. */
	identification?: Identification;
	/** Buyer's phone number. */
	phone?: Phone;
	/** Buyer's billing or residential address. */
	address?: Address;
};

/**
 * Shipment details for physical-goods orders.
 */
export declare type ShipmentRequest = {
	/** Delivery destination address. */
	address?: ShipmentAddressRequest;
};

/**
 * Shipping destination address.
 */
export declare type ShipmentAddressRequest = {
	/** Postal / ZIP code. */
	zip_code?: string;
	/** Street name. */
	street_name?: string;
	/** Street number. */
	street_number?: string;
	/** Neighbourhood or district name. */
	neighborhood?: string;
	/** City name. */
	city?: string;
	/** State or province. */
	state?: string;
	/** Additional address detail (apartment, floor, etc.). */
	complement?: string;
	/** Country name or ISO code. */
	country?: string;
};
