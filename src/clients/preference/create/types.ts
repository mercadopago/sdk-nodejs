/**
 * Types for the "create preference" operation.
 *
 * Separates the internal client payload (includes config) from the
 * public-facing data type the SDK consumer passes to {@link Preference.create}.
 *
 * @module clients/preference/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceRequest } from '@src/clients/preference/commonTypes';
import type { Options } from '@src/types';

/**
 * Internal payload passed to the create REST call.
 */
export declare type PreferenceCreateClient = {
  /** Preference request body describing the checkout. */
  body: PreferenceRequest;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
};

/**
 * Public-facing input for {@link Preference.create}.
 */
export declare type PreferenceCreateData = {
  /** Preference request body describing the checkout. */
  body: PreferenceRequest;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}
