/**
 * Request and internal types for the customer update operation.
 *
 * @module clients/customer/update/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerRequestBody } from '../commonTypes';
import type { Options } from '@src/types';

/**
 * Public-facing input for {@link Customer.update}.
 */
export declare type CustomerUpdateData = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Fields to update on the customer record. */
  body: CustomerRequestBody;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};

/**
 * Internal payload forwarded to the `update` REST implementation.
 */
export declare type CustomerUpdateClient = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Fields to update on the customer record. */
  body: CustomerRequestBody;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};
