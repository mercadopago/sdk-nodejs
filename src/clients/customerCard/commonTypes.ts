/**
 * Shared response and helper types for the CustomerCard API client.
 *
 * Defines the API response envelope for saved-card operations and the
 * supporting nested types for payment method, security code, and issuer
 * information.
 *
 * @module clients/customerCard/commonTypes
 */

import type { ApiResponse, Options } from '@src/types';
import type { CustomerCardCardholder } from '../commonTypes';

/**
 * API response returned by customer-card endpoints (create, get, update, remove, list).
 *
 * Extends {@link ApiResponse} with all card-domain fields returned by
 * the MercadoPago `/v1/customers/:id/cards` resource.
 */
export declare interface CustomerCardResponse extends ApiResponse {
  /** Unique card identifier within the customer's wallet. */
  id?: string;
  /** Identifier of the customer who owns this card. */
  customer_id?: string;
  /** Card expiration month (1-12). */
  expiration_month?: number;
  /** Card expiration year (four digits). */
  expiration_year?: number;
  /** First six digits (BIN) of the card number. */
  first_six_digits?: string;
  /** Last four digits of the card number. */
  last_four_digits?: string;
  /** Payment method associated with this card (e.g. Visa, Mastercard). */
  payment_method?: CustomerCardPaymentMethod;
  /** Security code (CVV) metadata for this card. */
  security_code?: CustomerCardSecurityCode;
  /** Card issuer (bank or financial institution). */
  issuer?: CustomerCardIssuer;
  /** Cardholder name and identification document. */
  cardholder?: CustomerCardCardholder;
  /** Timestamp when the card was saved (ISO 8601). */
  date_created?: string;
  /** Timestamp of the last update to the card (ISO 8601). */
  date_last_updated?: string;
  /** MercadoPago user ID that owns the customer record. */
  user_id?: string;
  /** Whether this card was saved in live (production) mode. */
  live_mode?: boolean;
}

/**
 * Payment method details associated with a saved card.
 */
export declare type CustomerCardPaymentMethod = {
	/** Payment method identifier (e.g. `visa`, `master`). */
	id?: string;
	/** Human-readable payment method name. */
	name?: string;
	/** Payment type category (e.g. `credit_card`, `debit_card`). */
	payment_type_id?: string;
	/** URL of the payment method icon. */
	thumbnail?: string;
	/** HTTPS URL of the payment method icon. */
	secure_thumbnail?: string;
}

/**
 * Security code (CVV) metadata for a saved card.
 */
export declare type CustomerCardSecurityCode = {
	/** Number of digits in the security code. */
	length?: number;
	/** Physical location of the code on the card (e.g. `back`, `front`). */
	card_location?: string;
}

/**
 * Card issuer (bank or financial institution) information.
 */
export declare type CustomerCardIssuer = {
	/** Issuer identifier assigned by MercadoPago. */
	id?: number;
	/** Issuer display name. */
	name?: string;
}

/**
 * Input data for retrieving or removing a specific customer card.
 */
export declare type CustomerCardGetRemoveData = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Unique card identifier within the customer's wallet. */
  cardId: string;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};
