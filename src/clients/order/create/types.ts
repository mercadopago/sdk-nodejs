import { Address, Phone } from '@src/clients/commonTypes';
import { Options } from '@src/types';

export declare type CreateOrderData = {
  body: CreateOrderRequest;
  requestOptions?: Options;
}

export declare type CreateOrderRequest = {
  type?: string;
  total_amount?: string;
  external_reference?: string;
  type_config?: TypeConfig;
  transactions?: Transactions;
  currency?: string;
  processing_mode?: string;
  description?: string;
  payer?: Payer;
  marketplace?: string;
  marketplace_fee?: string;
  campaign_id?: string;
  items?: Item[];
  coupon?: Coupon;
  splits?: Split[];
  shipment?: Shipment;
  expiration_time?: string;
}

export declare type TypeConfig = {
  capture_mode?: string;
  ip_address?: string;
  callback_url?: string;
}

export declare type Transactions = {
  payments?: Payment[];
}

export declare type Payment = {
  amount?: string;
  currency?: string;
  payment_method?: PaymentMethod;
}

export declare type PaymentMethod = {
  id?: string;
  type?: string;
  token?: string;
  installments?: number;
  issuer_id?: string;
  statement_descriptor?: string;
}

export declare type Payer = {
  email?: string;
  first_name?: string;
  last_name?: string;
  identification?: Identification;
  phone?: Phone;
  address?: Address;
  authentication_type?: string;
  registration_date?: string;
  last_purchase?: string;
  is_prime_user?: boolean;
  is_first_purchase_online?: boolean;
  entity_type?: string;
}

export declare type Identification = {
  type?: string;
  number?: string;
}

export declare type Item = {
  title?: string;
  unit_price?: string;
  quantity?: number;
  description?: string;
  code?: string;
  type?: string;
  picture_url?: string;
  warranty?: boolean;
  category_descriptor?: CategoryDescriptor;
}

export declare type CategoryDescriptor = {
  event_date?: string;
  passenger?: Passenger;
  route?: Route;
}

export declare type Passenger = {
  first_name?: string;
  last_name?: string;
  identification_type?: string;
  identification_number?: string;
}

export declare type Route = {
  departure?: string;
  destination?: string;
  departure_date_time?: string;
  arrival_date_time?: string;
  company?: string;
}

export declare type Coupon = {
  code?: string;
  amount?: string;
}

export declare type Split = {
  oauth_token?: string;
  type?: string;
  value?: string;
}

export declare type Shipment = {
  receiver_address?: ReceiverAddress;
  width?: number;
  height?: number;
  express_shipment?: boolean;
  pick_up_on_seller?: boolean;
}

export declare type ReceiverAddress = {
  street_name?: string;
  street_number?: string;
  zip_code?: string;
  city_name?: string;
  state_name?: string;
  floor?: string;
  apartment?: string;
}
