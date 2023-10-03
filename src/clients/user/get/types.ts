import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

export declare type UserGetClient = {
  config: MercadoPagoConfig;
};

export declare interface UserResponse extends ApiResponse {
  id?: number;
  nickname?: string;
  registration_date?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  contry_id?: string;
  email?: string;
  identification?: Identification;
  address?: Address;
  phone?: Phone;
  alternative_phone?: AlternativePhone;
  tags?: string[];
  user_type?: string;
  logo?: string;
  points?: number;
  site_id?: string;
  permalink?: string;
  seller_experience?: string;
  bill_data?: BillData;
  seller_reputation?: SellerReputation;
  buyer_reputation?: BuyerReputation;
  status?: Status;
  secure_email?: string;
  company?: Company;
  credit?: Credit;
  context?: Context;
  registration_identifiers?: string[];
  country_id?: string;
}

export declare type Identification = {
  number: string;
  type: string;
};

export declare type Address = {
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
};

export declare type Phone = {
  area_code: string;
  extension: string;
  number: string;
  verified: boolean;
};

export declare type AlternativePhone = {
  area_code: string;
  extension: string;
  number: string;
};

export declare type BillData = {
  accept_credit_note?: string;
};

export declare type SellerReputation = {
  level_id: string | null;
  power_seller_status: string | null;
  transactions: SellerReputationTransactions;
  metrics: SellerReputationMetrics;
};

export declare type SellerReputationMetrics = {
  sales: SellerReputationMetricsSales;
  claims: SellerReputationMetricsRating;
  delayed_handling_time: SellerReputationMetricsRating;
  cancellations: SellerReputationMetricsRating;
};

export declare type SellerReputationMetricsSales = {
  period: string;
  completed: number;
};

export declare type SellerReputationTransactions = {
  canceled: number;
  completed: number;
  period: string;
  ratings: SellerReputationTransactionsRatings;
  total: number;
};

export declare type SellerReputationTransactionsRatings = {
  negative: number;
  neutral: number;
  positive: number;
};

export declare type BuyerReputation = {
  canceled_transactions: number;
  tags: string[];
  transactions: BuyerReputationTransactions;
};

export declare type BuyerReputationTransactions = {
  canceled: BuyerReputationTransactionsWithoutUnits;
  completed: number | null;
  not_yet_rated: BuyerReputationTransactionsWithUnits;
  period: string;
  total: number | null;
  unrated: BuyerReputationTransactionsWithoutUnits;
};

export declare type BuyerReputationTransactionsWithoutUnits = {
  paid: number | null;
  total: number | null;
};

export declare type BuyerReputationTransactionsWithUnits = {
  paid: number | null;
  total: number | null;
  units: number | null;
};

export declare type Status = {
  billing: StatusBilling;
  buy: StatusAllowImmediatePayment;
  confirmed_email: boolean;
  shopping_cart: StatusShoppingCart;
  immediate_payment: boolean;
  list: StatusAllowImmediatePayment;
  mercadoenvios: string;
  mercadopago_account_type: string;
  mercadopago_tc_accepted: boolean;
  required_action: string | null;
  sell: StatusAllowImmediatePayment;
  site_status: string;
  user_type: string;
};

export declare type StatusBilling = {
  allow: boolean;
  codes: string[];
};

export declare type StatusShoppingCart = {
  buy: string;
  sell: string;
};

export declare type StatusAllowImmediatePayment = {
  allow: boolean;
  codes: string[];
  immediate_payment: StatusImmediatePayment;
};

export declare type Company = {
  brand_name: string;
  city_tax_id: string;
  corporate_name: string;
  identification: string;
  state_tax_id: string;
  cust_type_id: string;
  soft_descriptor: string;
};

export declare type Credit = {
  consumed: number;
  credit_level_id: string;
  rank: string;
};

export declare type Context = {
  ip_address: string;
};

export declare type SellerReputationMetricsRating = {
  period: string;
  rate: number;
  value: number;
};

export declare type StatusImmediatePayment = {
  reasons: string[];
  required: boolean;
};

export declare type UserGetData = {
  requestOptions?: Options;
}
