/**
 * Types for the cancel-payment operation (`PUT /v1/payments/:id`).
 *
 * @module clients/payment/cancel/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';

/**
 * Public-facing input accepted by {@link Payment.cancel}.
 */
export declare type PaymentCancelData = {
  /** Unique identifier of the payment to cancel. */
  id: string | number;
  /** Per-request option overrides (timeout, headers, etc.). */
  requestOptions?: Options;
}

/**
 * Internal client payload passed to the cancel-payment function.
 */
export declare interface PaymentCancelClient extends PaymentCancelData {
  /** SDK configuration including the access token. */
  config: MercadoPagoConfig;
}
