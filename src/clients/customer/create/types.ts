/**
 * Request and internal types for the customer creation operation.
 *
 * @module clients/customer/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerRequestBody } from '../commonTypes';
import { Options } from '@src/types';

/**
 * Public-facing input for {@link Customer.create}.
 */
export declare type CustomerCreateData = {
  /** Customer fields to populate on the new record. */
  body: CustomerRequestBody;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
}

/**
 * Internal payload forwarded to the `create` REST implementation.
 */
export declare type CustomerCreateClient = {
  /** Customer fields to populate on the new record. */
  body: CustomerRequestBody;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};
