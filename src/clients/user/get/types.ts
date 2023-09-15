import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type UserGet = {
  config: MercadoPagoConfig;
};

export declare type UserResponse = {
  id: number;
  nickname: string;
  registration_date?: string;
  first_name: string;
  last_name: string;
  gender?: string;
  contry_id?: string;
  email: string;
  identification: Identification;
  address: Address;
  phone: Phone;
  alternative_phone: AlternativePhone;
  tags: string[];
  user_type?: string;
  logo?: string;
  points?: number;
  site_id: string;
  permalink?: string;
  seller_experience?: string;
  bill_data: BillData;
  seller_reputation: SellerReputation;
  buyer_reputation: BuyerReputation;
  status: Status;
  secure_email?: string;
  company: Company;
  credit: Credit;
  context: Context;
  registration_identifiers: string[];
  country_id: string;
};

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
  transactions: {
    canceled: number;
    completed: number;
    period: string;
    ratings: {
      negative: number;
      neutral: number;
      positive: number;
    };
    total: number;
  };
  metrics: {
    sales: {
      period: string;
      completed: number;
    };
    claims: SellerReputationMetrics;
    delayed_handling_time: SellerReputationMetrics;
    cancellations: SellerReputationMetrics;
  };
};

export declare type BuyerReputation = {
  canceled_transactions: number;
  tags: string[];
  transactions: {
    canceled: {
      paid: number | null;
      total: number | null;
    };
    completed: number | null;
    not_yet_rated: {
      paid: number | null;
      total: number | null;
      units: number | null;
    };
    period: string;
    total: number | null;
    unrated: {
      paid: number | null;
      total: number | null;
    };
  };
};

export declare type Status = {
  billing: {
    allow: boolean;
    codes: string[];
  };
  buy: {
    allow: boolean;
    codes: string[];
    immediate_payment: StatusImmediatePayment;
  };
  confirmed_email: boolean;
  shopping_cart: {
    buy: string;
    sell: string;
  };
  immediate_payment: boolean;
  list: {
    allow: boolean;
    codes: string[];
    immediate_payment: StatusImmediatePayment;
  };
  mercadoenvios: string;
  mercadopago_account_type: string;
  mercadopago_tc_accepted: boolean;
  required_action: string | null;
  sell: {
    allow: boolean;
    codes: string[];
    immediate_payment: StatusImmediatePayment;
  };
  site_status: string;
  user_type: string;
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

export declare type SellerReputationMetrics = {
  period: string;
  rate: number;
  value: number;
};

export declare type StatusImmediatePayment = {
  reasons: string[];
  required: boolean;
};
