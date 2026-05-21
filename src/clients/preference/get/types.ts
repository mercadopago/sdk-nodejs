import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PreferenceGetClient = {
  id: string;
  config: MercadoPagoConfig
};

export declare type PreferenceGetData = {
  preferenceId: string;
  requestOptions?: Options;
};
