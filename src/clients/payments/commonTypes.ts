export declare type MerchantAccount = {
  merchant_account_id: string;
};

export declare type Data = {
  routing_data: MerchantAccount; // conferir
};

export declare type PaymentMethod = {
  id: string; // repetido?
  type: string; // repetido?
  issuer_id: string; // repetido?
  data: Data; // diferente da sdk de java
}

export declare type Identification = {
  type: string;
  number: string;
}

export declare type Phone = {
  area_code: string;
  number: string;
  extension: string;
}

export declare type Payer = {
  type: string;
  id: string;
  operator_id: null; // conferir
  email: string;
  identification: Identification;
  phone: Phone;
  first_name: string;
  last_name: string;
  entity_type: string;
}

// objeto diferente da sdk de java
export declare type AdditionalInfo = {
  available_balance: null,
  nsu_processadora: null,
  authentication_code: null
};

export declare type TransactionDetails = {
  payment_method_reference_id: string;
  acquirer_reference: string;
  net_received_amount: number;
  total_paid_amount: number;
  overpaid_amount: number;
  external_resource_url: string;
  installment_amount: number;
  financial_institution: string;
  payable_deferral_period: string | null; // conferir
}

export declare type FeeDetails = {
  type: string;
  amount: number;
  fee_payer: string;
};

export declare type Accounts = {
  from: string;
  to: string;
}

export declare type Amounts = {
  original: number;
  refunded: number;
}

export declare type ChargesDetail = {
  id: string;
  name: string;
  type: string;
  accounts: Accounts;
  client_id: number;
  date_created: string;
  last_updated: string;
  amounts: Amounts;
  metadata: any;
  reserve_id: null; // conferir
  refund_charges: []; // conferir
}

export declare type Cardholder = {
  name: string;
  identification: Identification;
}

export declare type Card = {
  id: string;
  first_six_digits: string;
  last_four_digits: string;
  bin: string;
  expiration_month: number;
  expiration_year: number;
  date_created: string;
  date_last_updated: string;
  cardholder: Cardholder;
}

export declare type BusinessInfo = {
  unit: string;
  sub_unit: string;
};

export declare type PointOfInteraction = {
  type: string;
  business_info: BusinessInfo;
};

export declare type PaymentOrder = {
  id: number;
  type: string;
};

export declare type PaymentsResponse = {
  id: number;
  date_created: string;
  date_approved: string;
  date_last_updated: string;
  date_of_expiration: string;
  money_release_date: string;
  money_release_schema: string;
  money_release_status: string;
  operation_type: string;
  issuer_id: string;
  payment_method_id: string;
  payment_type_id: string;
  payment_method: PaymentMethod;
  status: string;
  status_detail: string;
  currency_id: string;
  description: string;
  live_mode: boolean;
  sponsor_id: number;
  authorization_code: string;
  integrator_id: string;
  taxes_amount: number;
  counter_currency: string;
  shipping_amount: number;
  build_version: string;
  pos_id: string;
  store_id: string;
  platform_id: string;
  corporation_id: string;
  payer: Payer;
  collector_id: number;
  metadata: any;
  additional_info:AdditionalInfo; // diferente da sdk de java
  order: PaymentOrder; // retorna {} vazio. copiei a estrutura de java.
  external_reference: string;
  transaction_amount: number;
  transaction_amount_refunded: number;
  coupon_amount: number;
  differential_pricing_id: string;
  deduction_schema: string;
  installments: number;
  transaction_details: TransactionDetails;
  fee_details: Array<FeeDetails>;
  charges_details: Array<ChargesDetail>; // nao tem na sdk de java
  captured: boolean;
  binary_mode: boolean;
  call_for_authorize_id: string;
  statement_descriptor: string;
  card: Card;
  notification_url: string;
  refunds: [];
  processing_mode: string;
  merchant_account_id: string;
  merchant_number: string;
  point_of_interaction: PointOfInteraction; // objeto diferente da sdk de java
  accounts_info: null; // conferir
  tags: null; // conferir
  financing_group: null; // conferir
  marketplace_owner: null; // conferir
  brand_id: null; // conferir
  acquirer_reconciliation: []; // conferir

}
