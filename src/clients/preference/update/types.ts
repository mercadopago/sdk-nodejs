import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceRequest } from '@src/clients/preference/commonTypes';
import type { Options } from '@src/types';

export declare type PreferenceId = {
  preferenceId: string;
};

export declare type PreferenceUpdateClient = {
  id: string;
  updatePreferenceRequest: PreferenceRequest;
  config: MercadoPagoConfig
};

export declare type PreferenceUpdateData = {
  id: string;
  updatePreferenceRequest: PreferenceRequest;
  requestOptions?: Options;
}
