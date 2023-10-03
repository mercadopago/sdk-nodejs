import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceRequest } from '@src/clients/preference/commonTypes';
import type { Options } from '@src/types';

export declare type PreferenceCreateClient = {
  body: PreferenceRequest;
  config: MercadoPagoConfig
};

export declare type PreferenceCreateData = {
  body: PreferenceRequest;
  requestOptions?: Options;
}
