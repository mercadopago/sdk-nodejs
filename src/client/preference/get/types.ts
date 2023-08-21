import { MercadoPagoConfig } from '../../../MercadoPagoConfig';

export declare type GetPreference = {
  id: string;
  config: MercadoPagoConfig
};

export declare type PreferenceId = {
  preferenceId: string;
};

export declare type Identification = {
  type: string;
  number: string;
};

export declare type Phone = {
  area_code: string;
  number: number;
};

export declare type Address = {
  zip_code: string;
  street_name: string;
  street_number: number;
};

export declare type Items = {
  id: string;
  title: string;
  description: number;
  picture_url: string;
  category_id: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
};

export declare type ReceiverAddress = {
  zip_code: string;
  street_name: string;
  city_name: string;
  state_name: string;
  street_number: number;
  floor: string;
  apartment: string;
};

export declare type PaymentMethods = {
  excluded_payment_methods: Array<string>;
  excluded_payment_types: Array<string>;
  default_payment_method_id: string;
  installments: string;
  default_installments: string;
};

export declare type BackUrls = {
  success: string;
  pending: string;
  failure: string;
};

export declare type PayerResponse = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: Phone;
  identification: Identification;
  address: Address;
  date_created: string;
};

export declare type ShipmentsResponse = {
  receiver_address: ReceiverAddress;
};

export declare type GetPreferenceResponse = {
  id: string;
  additional_info: string;
  auto_return: string;
  back_urls: BackUrls;
  client_id: string;
  collector_id: number;
  date_created: string;
  expiration_date_from: string;
  expiration_date_to: string;
  expires: boolean;
  init_point: string;
  items: Array<Items>;
  marketplace: string;
  marketplace_fee: number;
  metadata: NonNullable<unknown>; //map<string, object>
  notification_url: string;
  payer: PayerResponse;
  payment_methods: PaymentMethods;
  shipments: ShipmentsResponse;
  statement_descriptor: string;
  operation_type: string;

};
