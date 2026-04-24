/**
 * Request types for searching (retrieving) a payment intent by ID.
 *
 * @module point/searchPaymentIntent/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Internal parameters passed to the `searchPaymentIntent` implementation function. */
export declare type PointSearchPaymentIntentClient = {
  /** Unique identifier of the payment intent to retrieve. */
  payment_intent_id: string;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
}

/** Public input for {@link Point.searchPaymentIntent}, accepted by the class facade. */
export declare type PointSearchPaymentIntentData = {
  /** Unique identifier of the payment intent to retrieve. */
  payment_intent_id: string;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
