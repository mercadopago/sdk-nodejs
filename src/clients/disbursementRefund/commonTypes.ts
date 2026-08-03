/**
 * Shared domain types for the DisbursementRefund client.
 *
 * @module disbursementRefund/commonTypes
 */

/** Response representing a single disbursement refund. */
export declare type DisbursementRefundResponse = {
  /** Unique identifier of this disbursement refund. */
  id?: number;
  /** Identifier of the advanced payment this refund belongs to. */
  advanced_payment_id?: number;
  /** Identifier of the specific disbursement that was refunded. */
  disbursement_id?: number;
  /** Amount refunded. */
  amount?: number;
  /** Current status of the refund. */
  status?: string;
  /** ISO 8601 timestamp when the refund was created. */
  date_created?: string;
};
