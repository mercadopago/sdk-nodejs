/**
 * Request types for cancelling a payment intent on a Point device.
 *
 * @module point/cancelPaymentIntent/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Internal parameters passed to the `cancelPaymentIntent` implementation function. */
export declare type PointCancelPaymentIntentClient = {
  /** Unique identifier of the Point device that owns the intent. */
  device_id: string;
  /** Unique identifier of the payment intent to cancel. */
  payment_intent_id: string;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
}

/** Public input for {@link Point.cancelPaymentIntent}, accepted by the class facade. */
export declare type PointCancelPaymentIntentData = {
  /** Unique identifier of the Point device that owns the intent. */
  device_id: string;
  /** Unique identifier of the payment intent to cancel. */
  payment_intent_id: string;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
