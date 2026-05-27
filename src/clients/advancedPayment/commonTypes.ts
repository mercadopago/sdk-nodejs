/**
 * Shared domain types for the AdvancedPayment (marketplace split-payments) client.
 *
 * @module advancedPayment/commonTypes
 */

/** A single disbursement receiver within an advanced payment. */
export declare type AdvancedPaymentDisbursement = {
  /** Unique disbursement identifier assigned by MercadoPago. */
  id?: number;
  /** MercadoPago user identifier of the seller receiving the funds. */
  collector_id?: number;
  /** Amount disbursed to this collector. */
  amount?: number;
  /** Integrator-supplied external reference for this disbursement. */
  external_reference?: string;
  /** Marketplace application fee retained from this disbursement. */
  application_fee?: number;
  /** Scheduled date when funds are released to the seller (ISO 8601). */
  money_release_date?: string;
  /** Current status of this disbursement. */
  status?: string;
  /** Additional detail about the disbursement status. */
  status_detail?: string;
};

/** Response representing a single advanced (split) payment. */
export declare type AdvancedPaymentResponse = {
  /** Unique advanced payment identifier. */
  id?: number;
  /** Identifier of the MercadoPago application that created this payment. */
  application_id?: string;
  /** Integrator-supplied external reference. */
  external_reference?: string;
  /** Human-readable description of the payment. */
  description?: string;
  /** Overall status of the advanced payment. */
  status?: string;
  /** Whether the payment has been captured. */
  capture?: boolean;
  /** When `true`, the payment is approved or rejected immediately. */
  binary_mode?: boolean;
  /** ISO 8601 timestamp when this advanced payment was created. */
  date_created?: string;
  /** ISO 8601 timestamp of the last update. */
  date_last_updated?: string;
  /** List of disbursements associated with this payment. */
  disbursements?: AdvancedPaymentDisbursement[];
};
