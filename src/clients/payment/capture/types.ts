/**
 * Types for the capture-payment operation (`PUT /v1/payments/:id`).
 *
 * @module clients/payment/capture/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input accepted by {@link Payment.capture}.
 */
export declare type PaymentCaptureData = {
  /** Unique identifier of the authorized payment to capture. */
  id: string | number;
  /** Amount to capture; omit for a full capture, provide a lower value for a partial capture. */
  transaction_amount?: number;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}

/**
 * Internal client payload passed to the capture-payment function.
 */
export declare interface PaymentCaptureClient extends PaymentCaptureData {
  /** SDK configuration including the access token. */
  config: MercadoPagoConfig;
}
