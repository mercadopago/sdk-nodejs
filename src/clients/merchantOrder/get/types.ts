/**
 * Request types for retrieving a merchant order.
 *
 * @module merchantOrder/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';

/** Internal parameters passed to the `get` implementation function. */
export declare type MerchantOrderGetClient = {
  /** Unique identifier of the merchant order to retrieve. */
  merchantOrderId: string | number;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
}

/** Public input for {@link MerchantOrder.get}, accepted by the class facade. */
export declare type MerchantOrderGetData = {
  /** Unique identifier of the merchant order to retrieve. */
  merchantOrderId: string | number;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
