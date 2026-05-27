/**
 * Shared domain types for the Payment Refund client.
 *
 * Contains the response interfaces and supporting types returned by all
 * refund operations (create, get, list, total).
 *
 * @module paymentRefund/commonTypes
 */

import { ApiResponse } from '@src/types';

/** Origin that initiated the refund. */
export declare type Source = {
  /** Unique identifier of the source entity. */
  id: string;
  /** Display name of the refund source. */
  name: string;
  /** Source type (e.g. `collector`, `admin`). */
  type: string;
};

/** Response representing a single refund on a payment. */
export declare interface RefundResponse extends ApiResponse {
  /** Unique refund identifier. */
  id?: number;
  /** Identifier of the payment that was refunded. */
  payment_id?: number;
  /** Refund amount in the payment's currency. */
  amount?: number;
  /** Arbitrary metadata attached to the refund. */
  metadata?: any;
  /** Origin that initiated the refund. */
  source?: Source;
  /** ISO 8601 timestamp when the refund was created. */
  date_created?: string;
  /** Unique sequence number assigned by the payment processor. */
  unique_sequence_number?: string;
  /** Mode in which the refund was processed. */
  refund_mode?: string;
  /** Adjustment amount applied to the refund (e.g. rounding). */
  adjustment_amount?: number;
  /** Refund status (e.g. `approved`, `in_process`). */
  status?: string;
  /** Reason or description for the refund. */
  reason?: string;
  /** Net amount returned to the payer after adjustments. */
  amount_refunded_to_payer?: number;
}
