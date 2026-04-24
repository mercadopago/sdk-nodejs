/**
 * Request types for retrieving the status of a payment intent.
 *
 * @module point/getPaymentIntentStatus/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Internal parameters passed to the `getPaymentIntentStatus` implementation function. */
export declare type PointGetPaymentIntentStatusClient = {
  /** Unique identifier of the payment intent to query. */
  payment_intent_id: string;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
}

/** Public input for {@link Point.getPaymentIntentStatus}, accepted by the class facade. */
export declare type PointGetPaymentIntentStatusData = {
  /** Unique identifier of the payment intent to query. */
  payment_intent_id: string,
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
