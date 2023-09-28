import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Collector, MerchantOrderItemRequest, MerchantOrderPayerRequest } from '../commonTypes';
import type { Options } from '@src/types';

export declare type MerchantOrderCreateData = {
  body: MerchantOrderCreateRequestBody;
  requestOptions?: Options;
}

export declare type MerchantOrderCreateClient = {
  body: MerchantOrderCreateRequestBody;
  config: MercadoPagoConfig;
}

export declare type MerchantOrderCreateRequestBody = {
  collector?: Collector;
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
  version?: number
}

