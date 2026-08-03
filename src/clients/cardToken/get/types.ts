/**
 * Types for the get-card-token operation (`GET /v1/card_tokens/:id`).
 *
 * @module cardToken/get/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input accepted by {@link CardToken.get}.
 */
export declare type CardTokenGetData = {
  /** Unique card token identifier to retrieve. */
  id: string;
  /** Per-request option overrides (timeout, headers, etc.). */
  requestOptions?: Options;
}

/**
 * Internal client payload passed to the get-card-token function.
 */
export declare interface CardTokenGetClient extends CardTokenGetData {
  /** SDK configuration including the access token. */
  config: MercadoPagoConfig;
}
