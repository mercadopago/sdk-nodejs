/**
 * Request types for retrieving a single subscription invoice.
 *
 * @module invoice/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Public input for {@link Invoice.get}, accepted by the class facade. */
export declare type InvoiceGetData = {
  /** Unique identifier of the invoice (authorized payment) to retrieve. */
  id: string;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}

/** Internal parameters passed to the `get` implementation function. */
export declare type InvoiceGetClient = {
  /** Unique identifier of the invoice (authorized payment) to retrieve. */
  id: string;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig
};

