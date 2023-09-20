import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type ChangeDeviceOperatingMode = {
  device_id: string;
  request: OperatingMode;
  config: MercadoPagoConfig;
};

export declare type ChangeDeviceOperatingModeRequest = {
  device_id: string;
  request: OperatingMode;
};

export declare type OperatingMode = {
  operating_mode?: string;
};
