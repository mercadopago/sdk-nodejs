/**
 * Shared domain types for the Chargeback client.
 *
 * @module chargeback/commonTypes
 */

/** Response representing a single payment chargeback dispute. */
export declare type ChargebackResponse = {
  /** Unique chargeback identifier. */
  id?: string;
  /** Identifier of the payment that originated the dispute. */
  payment_id?: number;
  /** Current status of the chargeback (e.g. `new`, `in_review`, `won`, `lost`). */
  status?: string;
  /** Amount disputed by the cardholder. */
  amount?: number;
  /** ISO 4217 currency code of the disputed amount. */
  currency_id?: string;
  /** Reason code provided by the card network. */
  reason_id?: string;
  /** Textual description of the dispute reason. */
  reason?: string;
  /** ISO 8601 timestamp when this chargeback was created. */
  date_created?: string;
  /** ISO 8601 timestamp of the last modification. */
  last_modified?: string;
};
