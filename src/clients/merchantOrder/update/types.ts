import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Collector, MerchantOrderItemRequest, MerchantOrderPayerRequest } from '../commonTypes';
import type { Options } from '@src/types';

export declare type MerchantOrderUpdateClient = {
  merchantOrderId: string | number;
  config: MercadoPagoConfig;
  body: MerchantOrderUpdateBody;
}

export declare type MerchantOrderUpdateData = {
  merchantOrderId: string | number;
  body: MerchantOrderUpdateBody;
  requestOptions?: Options;
}

export declare type MerchantOrderUpdateBody = {
  site_id?: string;
  payer?: MerchantOrderPayerRequest
  sponsor_id?: string;
  items?: MerchantOrderItemRequest[];
  shipments?: MerchantOrderShipmentRequest[];
  notification_url?: string;
  additional_info?: string;
  external_reference?: string;
  marketplace?: string;
  preference_id?: string;
  collector?: Collector;
  application_id?: string;
  version?: number;
}

export declare type MerchantOrderShipmentRequest = {
  id: number;
  shipping_type: string;
  shipping_mode: string;
  picking_type: string;
  status: string;
  shipping_substatus: string;
  items: object[];
  date_created: string;
  last_modified: string;
  date_first_printed: string;
  service_id: string;
  sender_id: number;
  receiver_id: number;
  receiver_address: MerchantOrderReceiverAddressRequest;
  shipping_option: MerchantOrderShippingOptionRequest;
}

export declare type MerchantOrderReceiverAddressRequest = {
  id: number;
  address_line: string;
  apartment: string;
  city: MerchantOrderReceiverAddressCityRequest;
  state: MerchantOrderReceiverAddressStateRequest;
  country: MerchantOrderReceiverAddressCountryRequest;
  comment: string;
  contact: string;
  zip_code: string;
  street_name: string;
  street_number: string;
  floor: string;
  phone: string;
  latitude: string;
  longitude: string;
}

export declare type MerchantOrderShippingOptionRequest = {
  id: number;
  cost: number;
  currency_id: string;
  estimated_delivery: MerchantOrderShippingEstimateDeliveryRequest;
  list_cost: number;
  name: string;
  shipping_method_id: number;
  speed: MerchantOrderShippingSpeedRequest;
}

export declare type MerchantOrderReceiverAddressCityRequest = {
  id: string;
  name: string;
}

export declare type MerchantOrderReceiverAddressStateRequest = {
  id: string;
  name: string;
}

export declare type MerchantOrderReceiverAddressCountryRequest = {
  id: string;
  name: string;
}

export declare type MerchantOrderShippingEstimateDeliveryRequest = {
  date: string;
  time_from: string;
  time_to: string;
}

export declare type MerchantOrderShippingSpeedRequest = {
  handling: number;
  shipping: number;
}
