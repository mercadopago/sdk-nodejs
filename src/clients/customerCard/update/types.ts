/**
 * Request and internal types for the customer card update operation.
 *
 * @module clients/customerCard/update/types
 */

import type { CustomerCardCardholder } from '@src/clients/commonTypes';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Internal payload forwarded to the `update` REST implementation.
 */
export declare type CustomerCardUpdateClient = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Unique card identifier within the customer's wallet. */
  cardId: string;
  /** Fields to update on the saved card. */
  body: CustomerCardUpdateBody;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};

/**
 * Mutable fields that can be changed on an existing saved card.
 */
export declare type CustomerCardUpdateBody = {
  /** Updated expiration month (1-12). */
  expiration_month?: number;
  /** Updated expiration year (four digits). */
  expiration_year?: number;
  /** Updated cardholder name and identification. */
  cardholder?: CustomerCardCardholder;
  /** New card token to replace the card's tokenised data. */
  token?: string;
};

/**
 * Public-facing input for {@link CustomerCard.update}.
 */
export declare type CustomerCardUpdateData = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Unique card identifier within the customer's wallet. */
  cardId: string;
  /** Fields to update on the saved card. */
  body: CustomerCardUpdateBody;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};
