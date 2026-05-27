/**
 * Shared request and response types for the Checkout Pro Preference client.
 *
 * These types model the JSON payloads accepted and returned by the
 * `/checkout/preferences` API endpoints. They describe items, payer
 * information, payment-method restrictions, tracking pixels, back URLs,
 * and the full preference response.
 *
 * @module clients/preference/commonTypes
 */

import type { Address, DifferentialPricing, Identification, Items, Shipments, Tax } from '@src/clients/commonTypes';
import { ApiResponse } from '@src/types';

/**
 * Phone number with optional area code, used within payer details.
 */
export declare type Phone = {
	/** Area or country dialling code. */
	area_code?: string;
	/** Local phone number. */
	number?: string;
};

/**
 * Buyer information attached to a preference.
 *
 * Pre-filling payer data speeds up the checkout flow because MercadoPago
 * can skip the identification step for known buyers.
 */
export declare type Payer = {
	/** Buyer first name. */
	name?: string;
	/** Buyer last name. */
	surname?: string;
	/** Buyer email address (used for identification and notifications). */
	email?: string;
	/** Buyer phone number. */
	phone?: Phone;
	/** Government-issued identification document. */
	identification?: Identification;
	/** Buyer billing address. */
	address?: Address;
	/** ISO 8601 timestamp when the payer account was created. */
	date_created?: string;
	/** Authentication type used by the payer (e.g. `gmail`). */
	authentication_type?: string,
	/** Whether the payer is a Mercado Libre loyalty-program member. */
	is_prime_user?: boolean,
	/** Whether this is the payer's first online purchase. */
	is_first_purchase_online?: boolean,
	/** ISO 8601 date when the payer registered on the platform. */
	registration_date?: string,
	/** ISO 8601 date of the payer's most recent purchase. */
	last_purchase?: string,
};

/**
 * Payment method to exclude from the checkout.
 */
export declare type ExcludedPaymentMethods = {
	/** Payment method identifier to exclude (e.g. `visa`, `amex`). */
	id?: string;
};

/**
 * Payment type to exclude from the checkout (e.g. `ticket`, `atm`).
 */
export declare type ExcludedPaymentTypes = {
	/** Payment type identifier to exclude. */
	id?: string;
};

/**
 * Payment method configuration for a preference.
 *
 * Allows restricting which methods, types, and installment plans the buyer
 * can choose during checkout.
 */
export declare type PaymentMethods = {
	/** Pre-selected saved-card identifier for the buyer. */
	default_card_id?: string;
	/** Pre-selected payment method identifier. */
	default_payment_method_id?: string;
	/** Payment methods the buyer will NOT see in checkout. */
	excluded_payment_methods?: Array<ExcludedPaymentMethods>;
	/** Payment types the buyer will NOT see in checkout. */
	excluded_payment_types?: Array<ExcludedPaymentTypes>;
	/** Maximum number of installments offered. */
	installments?: number;
	/** Default number of installments pre-selected in checkout. */
	default_installments?: number;
};

/**
 * Key-value data for a conversion-tracking pixel.
 */
export declare type TrackValues = {
	/** Google Ads conversion identifier. */
	conversion_id?: string;
	/** Google Ads conversion label. */
	conversion_label?: string;
	/** Facebook pixel identifier. */
	pixel_id?: string;
};

/**
 * Tracking pixel configuration attached to a preference.
 *
 * Allows integrators to fire conversion events in Google Ads or
 * Facebook when a payment is completed.
 */
export declare type Track = {
	/** Tracking platform (e.g. `google_ad`, `facebook_ad`). */
	type?: string;
	/** Platform-specific identifiers for the tracking pixel. */
	values?: TrackValues;
};

/**
 * URLs the buyer is redirected to after completing or abandoning checkout.
 */
export declare type BackUrls = {
	/** Redirect URL on approved payment. */
	success?: string;
	/** Redirect URL when payment is pending review. */
	pending?: string;
	/** Redirect URL on rejected payment. */
	failure?: string;
};

/**
 * Alternative redirect URLs used by certain checkout modes.
 */
export declare type RedirectUrls = {
	/** Redirect URL on approved payment. */
	success?: string;
	/** Redirect URL on rejected payment. */
	failure?: string;
	/** Redirect URL when payment is pending review. */
	pending?: string;
};

/**
 * Request body for creating or updating a Checkout Pro preference.
 *
 * The only required field is `items`; everything else lets you customize
 * the checkout experience (payment methods, redirects, expiration, etc.).
 */
export declare type PreferenceRequest = {
	/** Free-text additional information about the preference. */
	additional_info?: string;
	/** Auto-return behaviour after payment (`approved`, `all`). */
	auto_return?: string;
	/** URLs the buyer is redirected to after checkout. */
	back_urls?: BackUrls;
	/** When `true`, payments can only be approved or rejected (no pending). */
	binary_mode?: boolean;
	/** Discount coupon code applied to the preference. */
	coupon_code?: string;
	/** Internal labels associated with coupons. */
	coupon_labels?: Array<string>;
	/** ISO 8601 expiration date after which the preference cannot be paid. */
	date_of_expiration?: string;
	/** Differential pricing ID for marketplace fee splits. */
	differential_pricing?: DifferentialPricing;
	/** ISO 8601 start of the preference activation window. */
	expiration_date_from?: string;
	/** ISO 8601 end of the preference activation window. */
	expiration_date_to?: string;
	/** Whether the preference has an expiration window. */
	expires?: boolean;
	/** Integrator-defined reference to correlate with internal systems. */
	external_reference?: string;
	/** Items (products/services) included in this preference. */
	items: Array<Items>;
	/** Marketplace identifier when selling on behalf of another seller. */
	marketplace?: string;
	/** Fee amount collected by the marketplace in the transaction currency. */
	marketplace_fee?: number;
	/** Arbitrary key-value metadata attached to the preference. */
	metadata?: any;
	/** URL that receives IPN/webhook payment notifications. */
	notification_url?: string;
	/** Operation type (e.g. `regular_payment`, `money_transfer`). */
	operation_type?: string;
	/** Buyer information to pre-fill in the checkout. */
	payer?: Payer;
	/** Payment method restrictions and defaults. */
	payment_methods?: PaymentMethods;
	/** Processing modes (e.g. `aggregator`, `gateway`). */
	processing_modes?: Array<string>;
	/** Preference purpose (e.g. `wallet_purchase` for Wallet-only flow). */
	purpose?: string;
	/** Alternative redirect URLs. */
	redirect_urls?: RedirectUrls;
	/** Shipping configuration for physical goods. */
	shipments?: Shipments;
	/** Descriptor shown on the buyer's credit-card statement. */
	statement_descriptor?: string;
	/** Taxes applied to the preference total. */
	taxes?: Array<Tax>;
	/** Conversion-tracking pixels attached to the preference. */
	tracks?: Array<Track>;
}

/**
 * API response returned when creating, retrieving, or updating a preference.
 *
 * Extends the standard {@link ApiResponse} envelope with all preference
 * fields plus server-generated values such as `id`, `init_point`, and
 * `date_created`.
 */
export declare interface PreferenceResponse extends ApiResponse {
	/** Free-text additional information about the preference. */
	additional_info?: string;
	/** Auto-return behaviour after payment. */
	auto_return?: string;
	/** Post-checkout redirect URLs. */
	back_urls?: BackUrls;
	/** Whether payments can only be approved or rejected. */
	binary_mode?: boolean;
	/** OAuth application (client) identifier that created this preference. */
	client_id?: string;
	/** MercadoPago seller (collector) account identifier. */
	collector_id?: number;
	/** Discount coupon code applied to the preference. */
	coupon_code?: string;
	/** Internal labels associated with coupons. */
	coupon_labels?: Array<string>;
	/** ISO 8601 timestamp when the preference was created. */
	date_created?: string;
	/** ISO 8601 expiration date of the preference. */
	date_of_expiration?: string;
	/** Differential pricing ID for marketplace fee splits. */
	differential_pricing?: DifferentialPricing;
	/** ISO 8601 start of the preference activation window. */
	expiration_date_from?: string;
	/** ISO 8601 end of the preference activation window. */
	expiration_date_to?: string;
	/** Whether the preference has an expiration window. */
	expires?: boolean;
	/** Integrator-defined external reference. */
	external_reference?: string;
	/** Unique preference identifier assigned by MercadoPago. */
	id?: string;
	/** Production Checkout Pro URL -- redirect the buyer here to pay. */
	init_point?: string;
	/** MercadoPago internal metadata (opaque to integrators). */
	internal_metadata?: any;
	/** Items included in the preference. */
	items?: Array<Items>;
	/** Marketplace identifier. */
	marketplace?: string;
	/** Fee collected by the marketplace in the transaction currency. */
	marketplace_fee?: number;
	/** Arbitrary key-value metadata. */
	metadata?: any;
	/** Webhook/IPN notification URL. */
	notification_url?: string;
	/** Operation type. */
	operation_type?: string;
	/** Buyer information. */
	payer?: Payer;
	/** Payment method restrictions and defaults. */
	payment_methods?: PaymentMethods;
	/** Processing modes. */
	processing_modes?: Array<string>;
	/** Preference purpose. */
	purpose?: string;
	/** Alternative redirect URLs. */
	redirect_urls?: RedirectUrls;
	/** Sandbox Checkout Pro URL for testing. */
	sandbox_init_point?: string;
	/** MercadoPago site (country) identifier (e.g. `MLA`, `MLB`). */
	site_id?: string;
	/** Shipping configuration. */
	shipments?: Shipments;
	/** Credit-card statement descriptor. */
	statement_descriptor?: string;
	/** Conversion-tracking pixels. */
	tracks?: Array<Track>;
	/** Taxes applied to the preference total. */
	taxes?: Array<Tax>;
}
