/**
 * Request types for creating a merchant order.
 *
 * @module merchantOrder/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Collector, MerchantOrderItemRequest, MerchantOrderPayerRequest } from '../commonTypes';
import type { Options } from '@src/types';

/** Public input for {@link MerchantOrder.create}, accepted by the class facade. */
export declare type MerchantOrderCreateData = {
  /** Request body with the order details. */
  body: MerchantOrderCreateRequestBody;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}

/** Internal parameters passed to the `create` implementation function. */
export declare type MerchantOrderCreateClient = {
  /** Request body with the order details. */
  body: MerchantOrderCreateRequestBody;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
}

/** Body payload for creating a new merchant order. */
export declare type MerchantOrderCreateRequestBody = {
  /** Seller (payment collector) for the order. */
  collector?: Collector;
  /** Checkout preference ID that originated this order. */
  preference_id?: string;
  /** Application ID creating the order. */
  application_id?: string;
  /** MercadoPago site identifier (e.g. `MLA`, `MLB`). */
  site_id?: string;
  /** Buyer information. */
  payer?: MerchantOrderPayerRequest;
  /** Sponsor (marketplace) identifier. */
  sponsor_id?: string;
  /** Line items to include in the order. */
  items?: MerchantOrderItemRequest[];
  /** URL to receive webhook notifications about order updates. */
  notification_url?: string;
  /** Free-form text with extra information about the order. */
  additional_info?: string;
  /** Integrator's external reference for reconciliation. */
  external_reference?: string;
  /** Marketplace identifier. */
  marketplace?: string;
  /** Order version for optimistic concurrency control. */
  version?: number
}

