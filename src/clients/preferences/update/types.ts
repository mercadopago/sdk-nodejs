import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceRequest } from '@src/clients/preferences/commonTypes';

export declare type PreferenceId = {
  preferenceId: string;
};

export declare type UpdatePreference = {
  id: string;
  updatePreferenceRequest: PreferenceRequest;
  config: MercadoPagoConfig
};

export declare type UpdatePreferenceRequest = {
  id: string;
  updatePreferenceRequest: PreferenceRequest;
}
