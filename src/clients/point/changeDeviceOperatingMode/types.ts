/**
 * Request types for changing a Point device's operating mode.
 *
 * @module point/changeDeviceOperatingMode/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Internal parameters passed to the `changeDeviceOperatingMode` implementation function. */
export declare type PointChangeDeviceOperatingModeClient = {
  /** Unique identifier of the Point device to update. */
  device_id: string;
  /** Desired operating mode configuration. */
  request: OperatingMode;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/** Public input for {@link Point.changeDeviceOperatingMode}, accepted by the class facade. */
export declare type PointChangeDeviceOperatingModeData = {
  /** Unique identifier of the Point device to update. */
  device_id: string;
  /** Desired operating mode configuration. */
  request: OperatingMode;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
};

/** Payload specifying the target operating mode for a Point device. */
export declare type OperatingMode = {
  /** Operating mode to set (e.g. `PDV` for integrated, `STANDALONE` for manual). */
  operating_mode?: string;
};
