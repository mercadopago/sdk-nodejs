/**
 * Request and response types for the identification-types endpoint.
 *
 * @module identificationType/list/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Public input for {@link IdentificationType.list}, accepted by the class facade. */
export declare type IdentificationTypeListData = {
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}

/** Internal parameters passed to the `list` implementation function. */
export declare type IdentificationTypeGet = {
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/** Response representing a single accepted identification document type. */
export declare interface IdentificationTypeResponse extends ApiResponse {
  /** Unique identifier code (e.g. `CPF`, `DNI`, `CURP`). */
  id?: string;
  /** Human-readable name of the document type. */
  name?: string;
  /** Document classification (e.g. `number`, `string`). */
  type?: string;
  /** Minimum number of characters allowed for the document number. */
  min_length?: number;
  /** Maximum number of characters allowed for the document number. */
  max_length?: number;
}
