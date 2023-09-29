import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PointGetDevicesClient = {
  filters?: GetDevicesSearch;
  config: MercadoPagoConfig;
};

export declare type GetDevicesRequest = {
  filters?: GetDevicesSearch;
};

export declare type GetDevicesSearch = {
  store_id: string;
  pos_id: string;
  limit: number;
  offset: number;
};

export declare type PointGetDevicesData = {
  request?: GetDevicesRequest;
  requestOptions?: Options;
}
