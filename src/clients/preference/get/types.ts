/**
 * Types for the "get preference" operation.
 *
 * @module clients/preference/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Internal payload passed to the get REST call.
 */
export declare type PreferenceGetClient = {
  /** Unique preference identifier. */
  id: string;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
};

/**
 * Public-facing input for {@link Preference.get}.
 */
export declare type PreferenceGetData = {
  /** Unique preference identifier to retrieve. */
  preferenceId: string;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
};
