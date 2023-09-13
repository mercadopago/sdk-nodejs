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
    areaCode: string;
    extension: string;
    number: string;
    verified: boolean;
  };
  alternativePhone: {
    areaCode: string;
    extension: string;
    number: string;
  };
  tags: string[];
  userType?: string;
  logo?: string;
  points?: number;
  siteId: string;
  permalink?: string;
  sellerExperience?: string;
  bill_data: {
    acceptCreditNote?: string;
  };
  sellerReputation: {
    level_id: string | null;
    power_seller_status: string | null;
    transactions: {
      canceled: number;
      completed: number;
      period: string;
      ratings: {
        negative: number;
        neutral: number;
        positive: number
      };
      total: number;
    };
    metrics: {
      sales: {
        period: string;
        completed: number;
      };
      claims: {
        period: string;
        rate: number;
        value: number;
      };
      delayed_handling_time: {
        period: string;
        rate: number;
        value: number;
      };
      cancellations: {
        period: string;
        rate: number;
        value: number;
      };
    };
  };
  buyer_reputation: {
    canceled_transactions: number;
    tags: string[];
    transactions: {
      canceled: {
        paid: number | null;
        total: number | null
      };
      completed: number | null;
      not_yet_rated: {
        paid: number | null;
        total: number | null;
        units: number | null
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
      immediate_payment: {
        reasons: string[];
        required: boolean;
      };
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
      immediate_payment: {
        reasons: string[];
        required: boolean;
      };
    };
    mercadoenvios: string;
    mercadopago_account_type: string;
    mercadopago_tc_accepted: boolean;
    required_action: string | null;
    sell: {
      allow: boolean;
      codes: string[];
      immediate_payment: {
        reasons: string[];
        required: boolean;
      };
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
  countryId: string;
};
