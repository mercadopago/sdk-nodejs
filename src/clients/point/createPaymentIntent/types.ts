/**
 * Request types for creating a payment intent on a Point device.
 *
 * @module point/createPaymentIntent/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentIntentRequest } from '../commonTypes';
import type { Options } from '@src/types';

/** Internal parameters passed to the `createPaymentIntent` implementation function. */
export declare type PointCreatePaymentIntentClient = {
  /** Unique identifier of the target Point device. */
  device_id: string;
  /** Payment intent details (amount, description, payment config). */
  request: PaymentIntentRequest;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/** Public input for {@link Point.createPaymentIntent}, accepted by the class facade. */
export declare type PointCreatePaymentIntentData = {
  /** Unique identifier of the target Point device. */
  device_id: string;
  /** Payment intent details (amount, description, payment config). */
  request: PaymentIntentRequest;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
};
