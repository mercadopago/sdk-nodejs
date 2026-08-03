/**
 * Types for the get-payment operation (`GET /v1/payments/:id`).
 *
 * @module clients/payment/get/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input accepted by {@link Payment.get}.
 */
export declare type PaymentGetData = {
  /** Unique payment identifier to retrieve. */
  id: string | number;
  /** Per-request option overrides (timeout, headers, etc.). */
  requestOptions?: Options;
}

/**
 * Internal client payload passed to the get-payment function.
 */
export declare interface PaymentGetClient extends PaymentGetData {
  /** SDK configuration including the access token. */
  config: MercadoPagoConfig;
}
