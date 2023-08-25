import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { PreferenceRequest } from '@src/clients/preferences/commonTypes';

export declare type CreatePreferenceRequest = {
  preferenceRequest: PreferenceRequest;
  config: MercadoPagoConfig
};
