/**
 * Request types for listing payment intent events.
 *
 * @module point/getPaymentIntentList/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Internal parameters passed to the `getPaymentIntentList` implementation function. */
export declare type PointGetPaymentIntentListClient = {
  /** Optional date-range filters sent as query parameters. */
  options?: GetPaymentIntentList;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/** Wrapper containing the optional date-range filter for payment intent events. */
export declare type GetPaymentIntentListRequest = {
  /** Date-range filter options. */
  options?: GetPaymentIntentList;
};

/** Date-range filter for querying payment intent events. */
export declare type GetPaymentIntentList = {
  /** Start of the date range in ISO 8601 format (inclusive). */
  startDate: string;
  /** End of the date range in ISO 8601 format (inclusive). */
  endDate: string;
};

/** Public input for {@link Point.getPaymentIntentList}, accepted by the class facade. */
export declare type PointGetPaymentIntentListData = {
  /** Optional request body containing date-range filters. */
  body?: GetPaymentIntentListRequest;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
