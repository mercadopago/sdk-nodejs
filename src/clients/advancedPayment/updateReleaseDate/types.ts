/**
 * Request types for the update-release-date operation on an advanced payment.
 *
 * @module advancedPayment/updateReleaseDate/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type AdvancedPaymentUpdateReleaseDateClient = {
  id: string;
  releaseDate: string;
  config: MercadoPagoConfig;
};

export declare type AdvancedPaymentUpdateReleaseDateData = {
  id: string;
  /** New release date in ISO 8601 format (e.g. `"2025-12-31 00:00:00.000"`). */
  releaseDate: string;
  requestOptions?: Options;
};
