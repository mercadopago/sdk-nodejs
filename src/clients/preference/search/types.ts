import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, SearchOptions } from '@src/types';

export declare type PreferenceSearchClient = {
  options?: PreferenceSearchOptions,
  config: MercadoPagoConfig
};

export declare type PreferenceSearchResponse = {
  elements?: Array<Elements>
  next_offset?: number;
  total?: number;
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
  items: Array<string>;
  last_updated: string;
  live_mode: boolean;
  marketplace: string;
  operation_type: string;
  payer_email: string;
  payer_id: number;
  platform_id: string;
  processing_modes: Array<string>;
  product_id: string;
  purpose: string;
  site_id: string;
  sponsor_id: number;
  shipping_mode: string;
}

export declare interface PreferenceSearchOptions extends SearchOptions {
  sponsor_id?: string;
  external_reference?: string;
  site_id?: string;
  marketplace?: string;
}

export declare type PreferenceSearchData = {
  options?: PreferenceSearchOptions;
  requestOptions?: Options;
}
