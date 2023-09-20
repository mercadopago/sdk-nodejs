import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { MerchantOrderItemRequest, MerchantOrderPayerRequest } from '../commonTypes';

export declare type MerchantOrderCreate = {
  body: MerchantOrderCreateRequestBody;
}

export declare type MerchantOrderCreateRequest = {
  body: MerchantOrderCreateRequestBody;
  config: MercadoPagoConfig;
}

export declare type MerchantOrderCreateRequestBody = {
  preference_id?: string;
  application_id?: string;
  site_id?: string;
  payer?: MerchantOrderPayerRequest;
  sponsor_id?: string;
  items?: MerchantOrderItemRequest[];
  notification_url?: string;
  additional_info?: string;
  external_reference?: string;
  marketplace?: string;
}


