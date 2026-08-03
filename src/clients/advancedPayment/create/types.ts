/**
 * Request types for the create advanced-payment operation.
 *
 * @module advancedPayment/create/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export { AdvancedPaymentResponse };

/** A single payment within an advanced payment request. */
export declare type AdvancedPaymentPaymentRequest = {
  payment_method_id?: string;
  payment_type_id?: string;
  token?: string;
  date_of_expiration?: string;
  transaction_amount?: number;
  installments?: number;
  processing_mode?: string;
  description?: string;
  external_reference?: string;
  statement_descriptor?: string;
};

/** A single disbursement receiver in an advanced payment request. */
export declare type AdvancedPaymentDisbursementRequest = {
  collector_id?: number;
  amount?: number;
  external_reference?: string;
  application_fee?: number;
  money_release_date?: string;
};

/** Payer information for an advanced payment. */
export declare type AdvancedPaymentPayerRequest = {
  id?: string;
  type?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  identification?: { type?: string; number?: string };
  address?: { zip_code?: string; street_name?: string; street_number?: number };
};

/** Request body for creating an advanced payment. */
export declare type AdvancedPaymentCreateRequest = {
  application_id?: string;
  payments?: AdvancedPaymentPaymentRequest[];
  disbursements?: AdvancedPaymentDisbursementRequest[];
  payer?: AdvancedPaymentPayerRequest;
  external_reference?: string;
  description?: string;
  binary_mode?: boolean;
  capture?: boolean;
  additional_info?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

/** Internal parameters for the create function. */
export declare type AdvancedPaymentCreateClient = {
  body: AdvancedPaymentCreateRequest;
  config: MercadoPagoConfig;
};

/** Public input for {@link AdvancedPayment.create}. */
export declare type AdvancedPaymentCreateData = {
  body: AdvancedPaymentCreateRequest;
  requestOptions?: Options;
};
