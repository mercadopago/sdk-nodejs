import type { Identification } from '@src/clients/commonTypes';

export declare type Phone = {
  area_code?: string;
  number?: string;
};

export declare type Address = {
  zip_code?: string;
  street_name?: string;
  street_number?: number;
};

export declare type Payer = {
  name?: string;
  surname?: string;
  email?: string;
  phone?: Phone;
  identification?: Identification;
  address?: Address;
  date_created?: string;
  last_purchase?: string;
};

export declare type DifferentialPricing = {
  id?: number;
};

export declare type Items = {
  id: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id?: string;
  unit_price: number;
};

export declare type ReceiverAddress = {
  zip_code?: string;
  street_name?: string;
  street_number?: number;
  floor?: string;
  apartment?: string;
  city_name?: string;
  state_name?: string;
  country_name?: string;
};

export declare type FreeMethods = {
  id?: number;
};


export declare type Shipments = {
  mode?: string;
  local_pickup?: boolean;
  dimensions?: string;
  default_shipping_method?: number;
  free_methods?: Array<FreeMethods>;
  cost?: number;
  free_shipping?: boolean;
  receiver_address?: ReceiverAddress;
  express_shipment?: boolean;
};

export declare type ExcludedPaymentMethods = {
  id?: string;
};

export declare type ExcludedPaymentTypes = {
  id?: string;
};

export declare type PaymentMethods = {
  default_card_id?: string;
  default_payment_method_id?: string;
  excluded_payment_methods?: Array<ExcludedPaymentMethods>;
  excluded_payment_types?: Array<ExcludedPaymentTypes>;
  installments?: number;
  default_installments?: number;
};

export declare type TrackValues = {
  conversion_id?: string;
  conversion_label?: string;
  pixel_id?: string;
};

export declare type Track = {
  type?: string;
  values?: TrackValues;
};

export declare type BackUrls = {
  success?: string;
  pending?: string;
  failure?: string;
};

export declare type RedirectUrls = {
  success?: string;
  failure?: string;
  pending?: string;
};

export declare type Tax = {
  type?: string;
  value?: number;
};


export declare type PreferenceRequest = {
  additional_info?: string;
  auto_return?: string;
  back_urls?: BackUrls;
  binary_mode?: boolean;
  coupon_code?: string;
  coupon_labels?: Array<string>;
  date_of_expiration?: string;
  differential_pricing?: DifferentialPricing;
  expiration_date_from?: string;
  expiration_date_to?: string;
  expires?: boolean;
  external_reference?: string;
  items: Array<Items>;
  marketplace?: string;
  marketplace_fee?: number;
  metadata?: NonNullable<unknown>;
  notification_url?: string;
  operation_type?: string;
  payer?: Payer;
  payment_methods?: PaymentMethods;
  processing_modes?: Array<string>;
  purpose?: string;
  redirect_urls?: RedirectUrls;
  shipments?: Shipments;
  statement_descriptor?: string;
  taxes?: Array<Tax>;
  tracks?: Array<Track>;
}

export declare type PreferenceResponse = {
  additional_info: string;
  auto_return: string;
  back_urls: BackUrls;
  binary_mode: boolean;
  client_id: string;
  collector_id: number;
  coupon_code: string;
  coupon_labels: Array<string>;
  date_created: string;
  date_of_expiration: string;
  differential_pricing: DifferentialPricing;
  expiration_date_from: string;
  expiration_date_to: string;
  expires: boolean;
  external_reference: string;
  id: string;
  init_point: string;
  internal_metadata: NonNullable<unknown>;
  items: Array<Items>;
  marketplace: string;
  marketplace_fee: number;
  metadata: NonNullable<unknown>;
  notification_url: string;
  operation_type: string;
  payer: Payer;
  payment_methods: PaymentMethods;
  processing_modes: Array<string>;
  purpose: string;
  redirect_urls: RedirectUrls;
  sandbox_init_point: string;
  site_id: string;
  shipments: Shipments;
  statement_descriptor: string;
  tracks: Array<Track>;
  taxes: Array<Tax>;
};
