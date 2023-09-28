import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SearchOptions } from '@src/types';

export declare type Search = {
  filters?: GetDevicesSearch;
  config: MercadoPagoConfig;
};

export declare type GetDevicesRequest = {
  filters?: GetDevicesSearch;
};

export declare interface GetDevicesSearch extends SearchOptions {
  store_id: string;
  pos_id: string;
}
