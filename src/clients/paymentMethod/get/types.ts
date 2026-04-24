/**
 * Request and response types for the payment-methods endpoint.
 *
 * @module paymentMethod/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse } from '@src/types';

/** Internal parameters passed to the `get` implementation function. */
export declare type PaymentMethodGetClient = {
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/** Response representing a single available payment method. */
export declare interface PaymentMethodResponse extends ApiResponse {
  /** Unique payment method identifier (e.g. `visa`, `master`, `pix`). */
  id?: string;
  /** Human-readable display name (e.g. `Visa`, `Mastercard`). */
  name?: string;
  /** Category of payment (e.g. `credit_card`, `debit_card`, `ticket`). */
  payment_type_id?: string;
  /** Availability status (`active`, `deactivated`, `temporally_deactivated`). */
  status?: string;
  /** HTTPS URL to a secure thumbnail image of the payment method logo. */
  secure_thumbnail?: string;
  /** URL to the payment method logo thumbnail. */
  thumbnail?: string;
  /** Whether the payment method supports deferred capture (`supported`, `unsupported`, `does_not_apply`). */
  deferred_capture?: string;
  /** Card-specific settings (BIN patterns, card number length, security code). */
  settings?: PaymentMethodSettings[];
  /** Additional information fields the buyer must provide (e.g. `cardholder_name`). */
  additional_info_needed?: string[];
  /** Minimum allowed payment amount for this method. */
  min_allowed_amount?: number;
  /** Maximum allowed payment amount for this method. */
  max_allowed_amount?: number;
  /** Estimated time in minutes for the payment to be accredited. */
  accreditation_time?: number;
  /** Financial institutions that support this payment method. */
  financial_institutions?: PaymentMethodFinancialInstitutions[];
  /** Processing modes supported (e.g. `aggregator`, `gateway`). */
  processing_modes?: string[];
}

/** Card-specific settings for a payment method. */
export declare type PaymentMethodSettings = {
  /** BIN (Bank Identification Number) pattern rules. */
  bin?: PaymentMethodSettingsBin;
  /** Card number length and validation rules. */
  card_number?: PaymentMethodSettingsCardNumber;
  /** Security code (CVV/CVC) rules. */
  security_code?: PaymentMethodSettingsSecurityCode;
};

/** Financial institution that supports a payment method. */
export declare type PaymentMethodFinancialInstitutions = {
  /** Unique institution identifier. */
  id?: number;
  /** Human-readable institution name. */
  description?: string;
};

/** BIN pattern rules for identifying card brands. */
export declare type PaymentMethodSettingsBin = {
  /** Regex pattern that the card BIN must match. */
  pattern: string;
  /** Regex pattern for BINs explicitly excluded from this method. */
  exclusion_pattern: string;
  /** Regex pattern for BINs eligible for installment plans. */
  installments_pattern: string;
};

/** Card number validation rules. */
export declare type PaymentMethodSettingsCardNumber = {
  /** Expected card number length. */
  length: number;
  /** Validation algorithm (e.g. `standard`, `none`). */
  validation: string;
}

/** Security code (CVV/CVC) rules for a payment method. */
export declare type PaymentMethodSettingsSecurityCode = {
  /** Whether the code is mandatory or optional. */
  mode: string;
  /** Expected length of the security code (typically 3 or 4). */
  length: number;
  /** Where the code is printed on the card (e.g. `back`, `front`). */
  card_location: string;
}
