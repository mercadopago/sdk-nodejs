import { ApiResponse } from '@src/types';
import type { Address, Items } from '../commonTypes';
import type { Payer, PaymentMethod, AdditionalInfo, TransactionDetails, FeeDetails, ChargesDetails, Card } from '../payment/commonTypes';

export declare type AdvancedPaymentDisbursement = {
  id?: string;
  amount?: number;
  external_reference?: string;
  collector_id?: string;
  application_fee?: number;
  money_release_days?: number;
  additional_info?: DisbursementAdditionalInfo;
};

export declare type DisbursementAdditionalInfo = {
  items?: Array<Items>;
  shipments?: DisbursementShipments;
};

export declare type DisbursementShipments = {
  receiver_address?: Address;
};

export declare type AdvancedPaymentPayment = {
  id?: string;
  payment_method_id?: string;
  payment_type_id?: string;
  payment_method?: PaymentMethod;
  token?: string;
  installments?: number;
  issuer_id?: string;
  amount?: number;
  processing_mode?: string;
  capture?: boolean;
  external_reference?: string;
  description?: string;
  statement_descriptor?: string;
  payer?: Payer;
  additional_info?: AdditionalInfo;
  transaction_details?: TransactionDetails;
  fee_details?: Array<FeeDetails>;
  charges_details?: Array<ChargesDetails>;
  card?: Card;
  status?: string;
  status_detail?: string;
  date_created?: string;
  date_last_updated?: string;
  money_release_date?: string;
  refunds?: Array<any>;
};

export declare type AdvancedPaymentRefund = {
  id?: string;
  payment_id?: string;
  amount?: number;
  metadata?: Record<string, any>;
  source?: {
    id?: string;
    name?: string;
    type?: string;
  };
  date_created?: string;
  disbursement_id?: string;
};

export declare interface AdvancedPaymentResponse extends ApiResponse {
  id?: string;
  status?: string;
  payments?: Array<AdvancedPaymentPayment>;
  disbursements?: Array<AdvancedPaymentDisbursement>;
  payer?: Payer;
  external_reference?: string;
  description?: string;
  binary_mode?: boolean;
  date_created?: string;
  date_last_updated?: string;
  metadata?: Record<string, any>;
  additional_info?: AdditionalInfo;
  application_fee?: number;
  money_release_date?: string;
} 