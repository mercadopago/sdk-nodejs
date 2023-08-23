import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type Search = {
  filters?: PreferenceSearchOptions,
  config: MercadoPagoConfig
};

export declare type PreferenceSearchResponse = {
  elements: Array<Elements>
  next_offset: number;
  total: number;
};

export declare type Items = {
  id: string;
  title: string;
  description: string;
  picture_url: string;
  category_id: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
};

export declare type Elements = {
  id: string;
  client_id: string;
  collector_id: number;
  concept_id: number;
  corporation_id: string;
  date_created: string;
  expiration_date_from: string;
  expiration_date_to: string;
  expires: boolean;
  external_reference: string;
  integrator_id: string;
  items: Array<Items>;
  last_updated: string;
  live_mode: boolean;
  marketplace: string;
  operation_type: string;
  payer_email: string;
  platform_id: string;
  processing_modes: string;
  product_id: string;
  purpose: string;
  site_id: string;
  sponsor_id: number;
}

export declare type PreferenceSearchOptions = {
  sponsor_id?: string;
  external_reference?: string;
  site_id?: string;
  marketplace?: string;
};
