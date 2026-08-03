/**
 * Request types for creating a partial refund on a payment.
 *
 * @module paymentRefund/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Public input for {@link PaymentRefund.create}, accepted by the class facade. */
export declare type PaymentRefundCreateData = {
  /** Identifier of the payment to refund. */
  payment_id: string | number;
  /** Optional body specifying the partial refund amount. */
  body?: CreateRefundBody;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
};

/** Body payload for a partial refund request. */
export declare type CreateRefundBody = {
  /** Amount to refund; omit to refund the full remaining balance. */
  amount?: number;
};

/** Internal parameters passed to the `create` implementation function. */
export declare type PaymentRefundCreateClient = {
  /** Identifier of the payment to refund. */
  payment_id: string | number;
  /** Optional body specifying the partial refund amount. */
  body?: CreateRefundBody;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig
};
