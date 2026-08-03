/**
 * Types for the update-payment operation (`PUT /v1/payments/:id`).
 *
 * @module clients/payment/update/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentCreateRequest } from '../create/types';
import { Options } from '@src/types';

/**
 * Public-facing input accepted by {@link Payment.update}.
 */
export declare type PaymentUpdateData = {
  /** Unique identifier of the payment to update. */
  id: string | number;
  /** Fields to update on the payment resource. */
  body: Partial<PaymentCreateRequest>;
  /** Per-request option overrides (timeout, headers, etc.). */
  requestOptions?: Options;
}

/**
 * Internal client payload passed to the update-payment function.
 */
export declare interface PaymentUpdateClient extends PaymentUpdateData {
  /** SDK configuration including the access token. */
  config: MercadoPagoConfig;
}
