/**
 * Shared response types for the Card Token client.
 *
 * Contains the response structure returned after tokenizing a card,
 * which replaces sensitive card data with a single-use token for PCI
 * compliance.
 *
 * @module cardToken/commonTypes
 */

import { ApiResponse } from '@src/types';
import { CustomerCardCardholder } from '../commonTypes';

/** Response returned after successfully tokenizing a card. */
export declare interface CardTokenResponse extends ApiResponse {
  /** Single-use token ID to be used in payment creation instead of raw card data. */
  id?: string;
  /** Identifier of the saved card (if tokenizing a previously stored card). */
  card_id?: string;
  /** First six digits (BIN) of the card number for identification purposes. */
  first_six_digits?: string;
  /** Card expiration month (1-12). */
  expiration_month?: number;
  /** Card expiration year (four-digit). */
  expiration_year?: number;
  /** Last four digits of the card number for display purposes. */
  last_four_digits?: string;
  /** Cardholder name and identification document. */
  cardholder?: CustomerCardCardholder;
  /** Token status (e.g. `active`, `used`, `expired`). */
  status?: string;
  /** ISO 8601 timestamp when the token was created. */
  date_created?: string;
  /** ISO 8601 timestamp when the token was last updated. */
  date_last_updated?: string;
  /** ISO 8601 timestamp when the token expires and can no longer be used. */
  date_due?: string;
  /** Whether the card number passes the Luhn checksum. */
  luhn_validation?: boolean;
  /** Whether the token was created in production (`true`) or sandbox (`false`). */
  live_mode?: boolean;
  /** Whether the token requires ESC (Extended Security Code) validation. */
  require_esc?: boolean;
  /** Length of the card number. */
  card_number_length?: number;
  /** Length of the security code (CVV/CVC). */
  security_code_length?: number;
}
