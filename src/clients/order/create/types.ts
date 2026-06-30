/**
 * Request and internal-client types for the create order operation.
 *
 * @module clients/order/create/types
 */

import { Phone } from '../../../clients/commonTypes';
import { MercadoPagoConfig } from '../../../mercadoPagoConfig';
import { Options } from '../../../types';
import { Address, AutomaticPayments, Identification, InstallmentsConfig, Item, RetriesConfig, StoredCredential, SubscriptionData, Track, TransactionSecurity } from '../commonTypes';

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
 */
export declare type CreateOrderRequest = {
	/** Order channel type (e.g. `"online"`, `"point"`, `"qr"`). */
	type?: string;
	/** Integrator-defined external reference for reconciliation. */
	external_reference?: string;
	/** Payment transactions to attach to the order at creation time. */
	transactions?: TransactionsRequest;
	/** Buyer (payer) information. */
	payer?: PayerRequest;
	/** Total order amount as a decimal string. Must equal the sum of all transaction payment amounts. */
	total_amount?: string;
	/**
	 * Payment capture strategy.
	 * `"automatic"`: approved or rejected immediately, no intermediate state.
	 * `"automatic_async"`: may have an intermediate challenge state.
	 */
	capture_mode?: string;
	/** Processing mode (e.g. `"automatic"`, `"manual"`). */
	processing_mode?: string;
	/** Human-readable order description. */
	description?: string;
	/** Marketplace identifier when the order originates from a marketplace. */
	marketplace?: string;
	/** Fee charged by the marketplace as a decimal string. Must be ≤ `total_amount`. */
	marketplace_fee?: string;
	/** Line items included in the order. If provided, must contain at least one entry. */
	items?: Item[];
	/** Payment method, checkout behaviour, and statement descriptor configuration. */
	config?: CreateOrderConfig;
	/** ISO 8601 date-time from which the checkout becomes available. */
	checkout_available_at?: string;
	/**
	 * Order availability duration in ISO 8601 duration format (e.g. `"P1D"` = 1 day).
	 * Takes precedence over the default TTL.
	 */
	expiration_time?: string;
	/** ISO 4217 currency code (e.g. `BRL`, `ARS`, `MXN`). */
	currency?: string;
	/**
	 * Supplementary data used by the fraud-prevention system.
	 * Required for vertical industries such as travel to improve approval rates.
	 */
	additional_info?: Record<string, any>;
	/** Shipping details for physical-goods orders. */
	shipment?: ShipmentRequest;
	/** Integration metadata identifying the integrator, platform, corporation, and sponsor. */
	integration_data?: IntegrationDataRequest;
};

/**
 * Top-level configuration object for an order creation request.
 */
export declare type CreateOrderConfig = {
	/** Text shown on the buyer's credit card statement (≈10 chars max). */
	statement_descriptor?: string;
	/**
	 * Offline payment expiration duration in ISO 8601 format.
	 * `"P1D"` means the offline payment is available for 1 day.
	 */
	default_payment_due_date?: string;
	/** Online checkout configuration (redirect URLs, tracking pixels, auto-return, access restrictions). */
	online?: OnlineConfigRequest;
	/** Payment method constraints (blocked brands, max installments, interest-free ranges). */
	payment_method?: PaymentMethodConfigRequest;
};

/**
 * Online checkout configuration sent in an order creation request.
 */
export declare type OnlineConfigRequest = {
	/**
	 * ISO 8601 date-time from which the order is available for payment.
	 * Buyers cannot pay before this time.
	 */
	available_from?: string;
	/**
	 * Restricts who can pay. `"account_only"` requires a logged-in Mercado Pago account.
	 * Omit to accept all users.
	 */
	allowed_user_type?: string;
	/** Redirect URL after a successful payment. */
	success_url?: string;
	/** Redirect URL after a rejected or cancelled payment. */
	failure_url?: string;
	/** Redirect URL when payment is pending (e.g. boleto generated, PIX awaiting). */
	pending_url?: string;
	/**
	 * Automatic redirect behaviour after payment.
	 * `"approved"`: redirect to `success_url` on approval.
	 * `"all"`: redirect on any outcome.
	 * Requires `success_url` to be set when using `"approved"`.
	 */
	auto_return?: 'approved' | 'all';
	/** Tracking pixels to fire on checkout events (Google Ads, Facebook Ads). */
	tracks?: Track[];
	/** Retry policy for this order. */
	retries?: RetriesConfig;
};

/**
 * Payment method constraints sent in an order creation request.
 */
export declare type PaymentMethodConfigRequest = {
	/** Maximum number of installments accepted (1–36). */
	max_installments?: number;
	/** Card brand IDs to block (e.g. `["amex"]`). */
	not_allowed_ids?: string[];
	/** Payment method types to block (e.g. `["ticket"]`). */
	not_allowed_types?: string[];
	/** Interest-free installment configuration. */
	installments?: InstallmentsConfig;
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
	/**
	 * Absolute date-time (ISO 8601) after which this payment can no longer be collected.
	 * Distinct from `expiration_time` (relative TTL). Type: string (ISO 8601).
	 */
	date_of_expiration?: string;
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
	/** Financial institution identifier (used for PSE and some bank transfer methods). */
	financial_institution?: string;
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
	/** Entity type of the payer (e.g. `individual`, `association`). */
	entity_type?: string;
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
	/** Shipping mode. `"custom"`: seller-defined. `"not_specified"`: no specification. */
	mode?: 'custom' | 'not_specified';
	/** When `true`, the buyer may pick up the product in person (disables shipping cost). */
	local_pickup?: boolean;
	/** Shipping cost when `mode` is `"custom"`. Must be ≥ 0. */
	cost?: string;
	/** When `true`, shipping is free for the buyer. Cannot be combined with `cost > 0`. */
	free_shipping?: boolean;
	/** IDs of the free shipping methods available to the buyer. */
	free_methods?: ShippingFreeMethod[];
	/** Delivery destination address. */
	address?: ShipmentAddressRequest;
};

/**
 * Free shipping method available to the buyer.
 */
export declare type ShippingFreeMethod = {
	/** Shipping method ID. */
	id: number;
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
	/** Floor. */
	floor?: string;
	/** Apartment / unit complement. */
	apartment?: string;
	/** Neighbourhood or district name. */
	neighborhood?: string;
	/** City name. */
	city?: string;
	/** State or province. */
	state?: string;
	/** Additional address detail. */
	complement?: string;
	/** Country name or ISO code. */
	country?: string;
};

/**
 * Integration metadata for an order request. Identifies the integrator, platform,
 * and corporation associated with the integration, plus any sponsoring marketplace owner.
 */
export declare type IntegrationDataRequest = {
	/** Identifier of the certified integrator. Type: string. */
	integrator_id?: string;
	/** Platform identifier assigned by MercadoPago. Type: string. */
	platform_id?: string;
	/** Corporation identifier for multi-account setups. Type: string. */
	corporation_id?: string;
	/** Sponsor (marketplace owner) information. */
	sponsor?: SponsorRequest;
};

/** Sponsoring marketplace owner associated with an order's integration metadata. */
export declare type SponsorRequest = {
	/** MercadoPago user ID of the sponsoring marketplace owner. Type: string. */
	id?: string;
};
