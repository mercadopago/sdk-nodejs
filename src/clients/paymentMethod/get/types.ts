import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse } from '@src/types';

export declare type PaymentMethodGetClient = {
  config: MercadoPagoConfig;
};

export declare interface PaymentMethodResponse extends ApiResponse {
  id?: string;
  name?: string;
  payment_type_id?: string;
  status?: string;
  secure_thumbnail?: string;
  thumbnail?: string;
  deferred_capture?: string;
  settings?: PaymentMethodSettings[];
  additional_info_needed?: string[];
  min_allowed_amount?: number;
  max_allowed_amount?: number;
  accreditation_time?: number;
  financial_institutions?: PaymentMethodFinancialInstitutions[];
  processing_modes?: string[];
}

export declare type PaymentMethodSettings = {
  bin?: PaymentMethodSettingsBin;
  card_number?: PaymentMethodSettingsCardNumber;
  security_code?: PaymentMethodSettingsSecurityCode;
};


export declare type PaymentMethodFinancialInstitutions = {
  id?: number;
  description?: string;
};

export declare type PaymentMethodSettingsBin = {
  pattern: string;
  exclusion_pattern: string;
  installments_pattern: string;
};

export declare type PaymentMethodSettingsCardNumber = {
  length: number;
  validation: string;
}

export declare type PaymentMethodSettingsSecurityCode = {
  mode: string;
  length: number;
  card_location: string;
}
