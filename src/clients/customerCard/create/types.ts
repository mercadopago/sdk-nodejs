/**
 * Request and internal types for the customer card creation operation.
 *
 * @module clients/customerCard/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Internal payload forwarded to the `create` REST implementation.
 */
export declare type CustomerCardCreateClient = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId?: string;
  /** Card token payload to associate with the customer. */
  body?: CustomerCardBody;
  /** SDK configuration including access token and global options. */
  config?: MercadoPagoConfig;
};

/**
 * Request body for saving a new card, containing a previously
 * generated card token from the MercadoPago tokenisation flow.
 */
export declare type CustomerCardBody = {
  /** Temporary card token obtained from the MercadoPago.js SDK or card tokenisation API. */
  token?: string;
};

/**
 * Public-facing input for {@link CustomerCard.create} and {@link Customer.createCard}.
 */
export declare type CustomerCardCreateData = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Card token payload to associate with the customer. */
  body: CustomerCardBody;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};
