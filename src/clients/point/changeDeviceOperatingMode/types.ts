import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PointChangeDeviceOperatingModeClient = {
  device_id: string;
  request: OperatingMode;
  config: MercadoPagoConfig;
};

export declare type PointChangeDeviceOperatingModeData = {
  device_id: string;
  request: OperatingMode;
  requestOptions?: Options;
};

export declare type OperatingMode = {
  operating_mode?: string;
};
