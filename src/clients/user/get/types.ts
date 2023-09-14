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
  identification: {
    number: string;
    type: string;
  };
  address: {
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
  };
  phone: {
    area_code: string;
    extension: string;
    number: string;
    verified: boolean;
  };
  alternative_phone: {
    area_code: string;
    extension: string;
    number: string;
  };
  tags: string[];
  user_type?: string;
  logo?: string;
  points?: number;
  site_id: string;
  permalink?: string;
  seller_experience?: string;
  bill_data: {
    accept_credit_note?: string;
  };
  seller_reputation: {
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
  buyer_reputation: {
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
  status: {
    billing: {
      allow: boolean;
      codes: string[];
    };
    buy: {
      allow: boolean;
      codes: string[];
      immediate_payment: StatusImmediate_payment;
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
      immediate_payment: StatusImmediate_payment;
    };
    mercadoenvios: string;
    mercadopago_account_type: string;
    mercadopago_tc_accepted: boolean;
    required_action: string | null;
    sell: {
      allow: boolean;
      codes: string[];
      immediate_payment: StatusImmediate_payment;
    };
    site_status: string;
    user_type: string;
  };
  secure_email?: string;
  company: {
    brand_name: string;
    city_tax_id: string;
    corporate_name: string;
    identification: string;
    state_tax_id: string;
    cust_type_id: string;
    soft_descriptor: string;
  };
  credit: {
    consumed: number;
    credit_level_id: string;
    rank: string;
  };
  context: {
    ip_address: string;
  };
  registration_identifiers: string[];
  country_id: string;
};

export declare type SellerReputationMetrics = {
  period: string;
  rate: number;
  value: number;
};

export declare type StatusImmediate_payment = {
  reasons: string[];
  required: boolean;
};
