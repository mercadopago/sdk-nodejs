/**
 * Request types for listing Point devices.
 *
 * @module point/getDevices/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, SearchOptions } from '@src/types';

/** Internal parameters passed to the `getDevices` implementation function. */
export declare type PointGetDevicesClient = {
  /** Optional search/filter criteria sent as query parameters. */
  options?: GetDevicesSearch;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/** Wrapper containing search options for querying devices. */
export declare type GetDevicesRequest = {
  /** Optional search/filter criteria for device listing. */
  options?: GetDevicesSearch;
};

/** Search filters for the get-devices endpoint. */
export declare interface GetDevicesSearch extends SearchOptions {
  /** Filter devices by the MercadoPago store identifier. */
  store_id: string;
  /** Filter devices by the point-of-sale identifier within a store. */
  pos_id: string;
}

/** Public input for {@link Point.getDevices}, accepted by the class facade. */
export declare type PointGetDevicesData = {
  /** Request containing optional search filters. */
  request: GetDevicesRequest;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
