import type { ApiResponse } from '@src/types';

export declare interface MerchantOrderResponse extends ApiResponse {
  id?: number;
  preference_id?: string;
  application_id?: string;
  status?: string;
  site_id?: string;
  payer?: MerchantOrderPayer;
  collector?: MerchantOrderCollector;
  sponsor_id?: string;
  payments?: MerchantOrderPayment[];
  paid_amount?: number;
  refunded_amount?: number;
  shipping_cost?: number;
  date_created?: string;
  cancelled?: boolean;
  items?: MerchantOrderItem[];
  shipments?: MerchantOrderShipment[];
  notification_url?: string;
  additional_info?: string;
  external_reference?: string;
  marketplace?: string;
  total_amount?: number;
  order_status?: string;
  last_updated?: string;
  is_test: boolean;
}

export declare type MerchantOrderPayer = {
  id?: number;
  nickname?: string;
};

export declare type MerchantOrderCollector = {
  id?: number;
  nickname?: string;
};

export declare type MerchantOrderPayment = {
  id?: number;
  transaction_amount?: number;
  total_paid_amount?: number;
  shipping_cost?: number;
  currency_id?: string;
  status?: string;
  status_details?: string;
  operation_type?: string;
  date_approved?: string;
  date_created?: string;
  last_modified?: string;
  amount_refunded?: number;
};

export declare type MerchantOrderItem = {
  id?: string;
  title?: string;
  description?: string;
  pictureUrl?: string;
  categoryId?: string;
  quantity?: number;
  unit_price?: number;
  currency_id?: string;
};

export declare type MerchantOrderShipment = {
  id?: number;
  shipping_type?: string;
  shipping_mode?: string;
  picking_type?: string;
  status?: string;
  shipping_sub_status?: string;
  items?: object;
  date_created?: string;
  last_modified?: string;
  date_first_printed?: string;
  service_id?: string;
  sender_id?: number;
  receiver_id?: number;
  receiver_address?: MerchantOrderReceiverAddress;
  shipping_option?: MerchantOrderShippingOption;
};

export declare type MerchantOrderReceiverAddress = {
  id: number;
  addressLine: string;
  apartment: string;
  city: MerchantOrderReceiverAddressCity;
  state: MerchantOrderReceiverAddressState;
  country: MerchantOrderReceiverAddressCountry;
  comment: string;
  contact: string;
  zip_code: string;
  street_name: string;
  street_number: string;
  floor: string;
  phone: string;
  latitude: string;
  longitude: string;
};

export declare type MerchantOrderShippingOption = {
  id: number;
  cost: number;
  currency_id: string;
  estimated_delivery: MerchantOrderShippingEstimateDelivery
  list_cost: number;
  name: string;
  shipping_method_id: number;
  speed: MerchantOrderShippingSpeed;
};

export declare type MerchantOrderReceiverAddressCity = {
  id: string;
  name: string;
}

export declare type MerchantOrderReceiverAddressState = {
  id: string;
  name: string;
}

export declare type MerchantOrderReceiverAddressCountry = {
  id: string;
  name: string;
}

export declare type MerchantOrderShippingEstimateDelivery = {
  date: string;
  time_from: string;
  time_to: string;
}

export declare type MerchantOrderShippingSpeed = {
  handling: number;
  shipping: number;
}

export declare type MerchantOrderItemRequest = {
  id?: string;
  title?: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity?: number;
  unit_price?: number;
  currency_id?: string;
}

export declare type MerchantOrderPayerRequest = {
  id: number;
  nickname: string;
}

export declare type Collector = {
  id: number
}
