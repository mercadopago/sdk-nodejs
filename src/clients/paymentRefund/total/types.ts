/**
 * Request types for creating a total (full-amount) refund.
 *
 * @module paymentRefund/total/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Public input for {@link PaymentRefund.total}, accepted by the class facade. */
export declare type PaymentRefundTotalData = {
  /** Identifier of the payment to fully refund. */
  payment_id: string | number;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
};

/** Internal parameters passed to the `total` implementation function. */
export declare type PaymentRefundTotalClient = {
  /** Identifier of the payment to fully refund. */
  payment_id: string | number;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig
};
