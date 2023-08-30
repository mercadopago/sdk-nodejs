import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceRequest } from '@src/clients/preferences/commonTypes';

export declare type CreatePreferenceRequest = {
  preferenceRequest: PreferenceRequest;
  config: MercadoPagoConfig
};
