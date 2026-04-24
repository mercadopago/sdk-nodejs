/**
 * Request types for retrieving a specific refund.
 *
 * @module paymentRefund/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Public input for {@link PaymentRefund.get}, accepted by the class facade. */
export declare type PaymentRefundGetData = {
  /** Identifier of the payment that owns the refund. */
  payment_id: string | number;
  /** Unique identifier of the refund to retrieve. */
  refund_id: string | number;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
};

/** Internal parameters passed to the `get` implementation function. */
export declare type PaymentRefundGetClient = {
  /** Identifier of the payment that owns the refund. */
  payment_id: string | number;
  /** Unique identifier of the refund to retrieve. */
  refund_id: string | number;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig
};
