import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type PreferenceId = {
  preferenceId: string;
};

export declare type UpdatePreference = {
  id: string;
  updatePreferenceRequest: UpdatePreferenceRequestData;
  config: MercadoPagoConfig
};

export declare type UpdatePreferenceRequest = {
  id: string;
  updatePreferenceRequest: UpdatePreferenceRequestData;
}

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

export declare type PayerRequest = {
  name?: string;
  surname?: string;
  email?: string;
  phone?: Phone;
  identification?: Identification;
  address?: Address;
  date_created?: string;
};

export declare type PayerResponse = {
  name: string;
  surname: string;
  email: string;
  phone: Phone;
  identification: Identification;
  address: Address;
  date_created: string;
};

export declare type DifferentialPricing = {
  id: number;
};

export declare type Items = {
  id: string;
  title?: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity?: number;
  currency_id?: string;
  unit_price?: number;
};

export declare type ReceiverAddress = {
  zip_code?: string;
  street_name?: string;
  city_name?: string;
  state_name?: string;
  street_number?: number;
  floor?: string;
  apartment?: string;
};

export declare type FreeMethods = {
  id: number;
};

export declare type ShipmentsRequest = {
  mode?: string;
  local_pickup?: boolean;
  dimensions?: string;
  default_shipping_method?: number;
  free_methods?: Array<FreeMethods>;
  cost?: number;
  free_shipping?: boolean;
  receiver_address?: ReceiverAddress;
};

export declare type ShipmentsResponse = {
  receiver_address: ReceiverAddress;
};

export declare type ExcludedPaymentMethods = {
  id: string;
};

export declare type ExcludedPaymentTypes = {
  id: string;
};

export declare type PaymentMethods = {
  excluded_payment_methods?: Array<ExcludedPaymentMethods>;
  excluded_payment_types?: Array<ExcludedPaymentTypes>;
  default_payment_method_id?: string;
  installments?: string;
  default_installments?: string;
};

export declare type Track = {
  type: string;
  values: string;
};

export declare type BackUrls = {
  success?: string;
  pending?: string;
  failure?: string;
};

export declare type RedirectUrls = {
  failure: string;
  pending: string;
  success: string;
};

export declare type Tax = {
  success: string;
  pending: string;
  failure: string;
};

export declare type UpdatePreferenceRequestData = {
  additional_info?: string;
  auto_return?: string;
  back_urls?: BackUrls;
  date_of_expiration?: string;
  differential_pricing?: DifferentialPricing;
  expiration_date_from?: string;
  expiration_date_to?: string;
  expires?: boolean;
  external_reference?: string;
  items?: Array<Items>;
  marketplace?: string;
  marketplace_fee?: number;
  metadata?: NonNullable<unknown>;
  notification_url?: string;
  payer?: PayerRequest;
  payment_methods?: PaymentMethods;
  shipments?: ShipmentsRequest;
}

export declare type UpdatePreferenceResponse = {
  id: string;
  additional_info: string;
  auto_return: string;
  back_urls: BackUrls;
  binary_mode: boolean;
  client_id: string;
  collector_id: number;
  coupon_code: NonNullable<unknown>;
  coupon_labels: NonNullable<unknown>;
  date_created: string;
  date_of_expiration:  NonNullable<unknown>;
  expiration_date_from: string;
  expiration_date_to: string;
  expires: boolean;
  external_reference: string;
  init_point: string;
  items: Array<Items>;
  internal_metadata: NonNullable<unknown>;
  last_updated: NonNullable<unknown>;
  marketplace: string;
  marketplace_fee: number;
  metadata: NonNullable<unknown>;
  notification_url: string;
  payer: PayerResponse;
  payment_methods: PaymentMethods;
  product_id: NonNullable<unknown>;
  processing_modes: NonNullable<unknown>;
  redirect_urls: RedirectUrls;
  shipments: ShipmentsResponse;
  site_id: string;
  statement_descriptor: string;
  operation_type: string;
  sandbox_init_point: string;
  total_amount: NonNullable<unknown>;
};
