/**
 * Request and response types for the get-refunds operation.
 *
 * @module order/get-refunds/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input for {@link Order.getRefunds}.
 */
export declare type OrderGetRefundsData = {
  /** Unique order identifier. */
  id: string;
  /** Per-request option overrides (timeout, headers, etc.). */
  requestOptions?: Options;
};

/**
 * Internal client payload passed to the get-refunds function.
 */
export declare type OrderGetRefundsClient = {
  /** Unique order identifier. */
  id: string;
  /** SDK configuration including the access token. */
  config: MercadoPagoConfig;
};

/**
 * A single refund record within the order.
 */
export declare type OrderRefund = {
  /** Unique refund identifier. */
  id?: string;
  /** Amount refunded. */
  amount?: string;
  /** Current status of the refund (e.g. 'processed', 'pending', 'cancelled'). */
  status?: string;
  /** Detailed reason for the refund status. */
  status_detail?: string;
  /** ISO 8601 timestamp when the refund was created. */
  date_created?: string;
  /** ISO 8601 timestamp of the last modification. */
  date_last_updated?: string;
  /** Transaction ID associated with this refund. */
  transaction_id?: string;
};

/**
 * Response containing the list of refunds for an order.
 */
export declare type OrderGetRefundsResponse = {
  /** List of refunds associated with the order. */
  refunds?: OrderRefund[];
};