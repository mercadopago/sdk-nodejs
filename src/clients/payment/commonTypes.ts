import { ApiResponse } from '@src/types';
import { RefundResponse } from '../paymentRefund/commonTypes';
import type { Address, Items, Tax } from '../commonTypes';

export declare type MerchantAccount = {
  merchant_account_id?: string;
};

export declare type Discount = {
  type?: string;
  value?: number;
  limit_date?: string;
};

export declare type Fee = {
  type?: string;
  value?: number;
};

export declare type Rules = {
  discounts?: Array<Discount>
  fine?: Fee;
  interest?: Fee;
};

export declare type Data = {
  routing_data?: MerchantAccount;
  rules?: Rules;
  reference_id?: string;
  external_reference_id?: string;
  external_resource_url?: string;
};

export declare type PaymentMethod = {
  id?: string;
  type?: string;
  issuer_id?: string;
  data?: Data;
}

export declare type Identification = {
  type?: string;
  number?: string;
}

export declare type Phone = {
  area_code?: string;
  number?: string;
  extension?: string;
}

export declare type Payer = {
  type?: string;
  id?: string;
  operator_id?: any;
  email?: string;
  identification?: Identification;
  phone?: Phone;
  first_name?: string;
  last_name?: string;
  entity_type?: string;
  address?: Address;
  authentication_type?: string,
  is_prime_user?: boolean,
  is_first_purchase_online?: boolean,
  registration_date?: string,
  last_purchase?: string,
}

export declare type PayerAdditionalInfo = {
  first_name?: string;
  last_name?: string;
  phone?: Phone;
  address?: Address;
  registration_date?: string;
};

export declare type ShipmentsPayment = {
  receiver_address?: ShipmentsReceiverAddress;
};

export declare type ShipmentsReceiverAddress = {
  floor?: string;
  apartment?: string;
  city_name?: string;
  state_name?: string;
};

export declare type AdditionalInfo = {
  ip_address?: string;
  items?: Array<Items>;
  payer?: PayerAdditionalInfo;
  shipments?: ShipmentsPayment;
};

export declare type TransactionDetails = {
  payment_method_reference_id?: string;
  acquirer_reference?: string;
  net_received_amount?: number;
  total_paid_amount?: number;
  overpaid_amount?: number;
  external_resource_url?: string;
  installment_amount?: number;
  financial_institution?: string;
  payable_deferral_period?: any;
  transaction_id?: string;
  barcode?: Barcode;
  digitable_line?: string;
  verification_code?: string;
  bank_transfer_id?: string;
}

export declare type Barcode = {
  content?: string;
}

export declare type FeeDetails = {
  type?: string;
  amount?: number;
  fee_payer?: string;
};

export declare type Accounts = {
  from?: string;
  to?: string;
}

export declare type Amounts = {
  original?: number;
  refunded?: number;
}

export declare type ChargesDetails = {
  id?: string;
  name?: string;
  type?: string;
  accounts?: Accounts;
  client_id?: number;
  date_created?: string;
  last_updated?: string;
  amounts?: Amounts;
  metadata?: any;
  reserve_id?: any;
  refund_charges?: any[];
}

export declare type Cardholder = {
  name?: string;
  identification?: Identification;
}

export declare type Card = {
  id?: string;
  first_six_digits?: string;
  last_four_digits?: string;
  bin?: string;
  expiration_month?: number;
  expiration_year?: number;
  date_created?: string;
  date_last_updated?: string;
  cardholder?: Cardholder;
}

export declare type BusinessInfo = {
  unit?: string;
  sub_unit?: string;
};

export declare type ApplicationData = {
  version?: string;
  name?: string;
};

export declare type PayerBankInfo = {
  email?: string;
  account_id?: number;
  long_name?: string;
};

export declare type CollectorBankInfo = {
  account_id?: number;
  long_name?: string;
};

export declare type BankInfo = {
  payer?: PayerBankInfo;
  collector?: CollectorBankInfo;
  is_same_bank_account_owner?: string;
};

export declare type TransactionData = {
  qr_code?: string;
  qr_code_base64?: string;
  transaction_id?: string;
  bank_transfer_id?: number;
  financial_institution?: number;
  bank_info?: BankInfo;
  ticket_url?: string;
};

export declare type PointOfInteraction = {
  type?: string;
  sub_type?: string;
  linked_to?: string;
  application_data?: ApplicationData;
  transaction_data?: TransactionData;
  business_info?: BusinessInfo;
};

export declare type PaymentOrder = {
  id?: number;
  type?: string;
};

export declare type ThreeDSInfo = {
  external_resource_url?: string;
  creq?: string;
};

export declare type GatewayReference = {
  network_transaction_id?: string;
};

export declare type Gateway = {
  reference?: GatewayReference;
};

export declare type Expanded = {
  gateway?: Gateway;
};

export declare interface PaymentResponse extends ApiResponse {
  id?: number;
  date_created?: string;
  date_approved?: string;
  date_last_updated?: string;
  date_of_expiration?: string;
  money_release_date?: string;
  money_release_schema?: string;
  money_release_status?: string;
  operation_type?: string;
  issuer_id?: string;
  payment_method_id?: string;
  payment_type_id?: string;
  payment_method?: PaymentMethod;
  status?: string;
  status_detail?: string;
  currency_id?: string;
  description?: string;
  live_mode?: boolean;
  sponsor_id?: number;
  authorization_code?: string;
  integrator_id?: string;
  taxes_amount?: number;
  counter_currency?: string;
  shipping_amount?: number;
  build_version?: string;
  pos_id?: string;
  store_id?: string;
  platform_id?: string;
  corporation_id?: string;
  payer?: Payer;
  collector_id?: number;
  metadata?: any;
  additional_info?: AdditionalInfo;
  order?: PaymentOrder;
  external_reference?: string;
  transaction_amount?: number;
  transaction_amount_refunded?: number;
  coupon_amount?: number;
  differential_pricing_id?: string;
  deduction_schema?: string;
  installments?: number;
  transaction_details?: TransactionDetails;
  fee_details?: Array<FeeDetails>;
  charges_details?: Array<ChargesDetails>;
  captured?: boolean;
  binary_mode?: boolean;
  call_for_authorize_id?: string;
  statement_descriptor?: string;
  card?: Card;
  notification_url?: string;
  refunds?: Array<RefundResponse>;
  processing_mode?: string;
  merchant_account_id?: string;
  merchant_number?: string;
  point_of_interaction?: PointOfInteraction;
  three_ds_info?: ThreeDSInfo;
  callback_url?: string;
  coupon_code?: string;
  net_amount?: number;
  payment_method_option_id?: string;
  taxes?: Array<Tax>
  internal_metadata?: any;
  expanded?: Expanded;
}

