import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type Search = {
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
