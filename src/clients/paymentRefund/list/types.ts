/**
 * Request types for listing all refunds on a payment.
 *
 * @module paymentRefund/list/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Public input for {@link PaymentRefund.list}, accepted by the class facade. */
export declare type PaymentRefundListData = {
  /** Identifier of the payment whose refunds to list. */
  payment_id: string | number;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
};

/** Internal parameters passed to the `list` implementation function. */
export declare type PaymentRefundListClient = {
  /** Identifier of the payment whose refunds to list. */
  payment_id: string | number;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};
