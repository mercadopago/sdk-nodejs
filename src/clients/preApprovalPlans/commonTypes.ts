import type { ApiResponse } from '@src/types';

export declare type AutoRecurring = {
  frequency?: number;
  frequency_type?: string;
  transaction_amount?: number;
  currency_id?: string;
  repetitions?: number;
  billing_day?: number;
  billing_day_proportional?: boolean;
  free_trial?: FreeTrial;
};

export declare type FreeTrial = {
  frequency: number;
  frequency_type: string;
  first_invoice_offset?: number
};

export declare type PaymentMethodsAllowed = {
  payment_types?: Array<PaymentType>;
  payment_methods?:  Array<PaymentMethod>;
};

export declare type PaymentType = {
  id?: string;
};

export declare type PaymentMethod = {
  id?: string;
};

export declare type PreApprovalPlanRequest = {
  back_url?: string;
  reason?: string;
  auto_recurring?: AutoRecurring;
  payment_methods_allowed?: PaymentMethodsAllowed;
};

export declare interface PreApprovalPlanResponse extends ApiResponse {
  id?: string;
  back_url?: string;
  auto_return?: string;
  collector_id?: number;
  application_id?: number;
  reason?: string;
  status?: string;
  date_created?: string;
  last_modified?: string;
  init_point?: string;
  auto_recurring?: AutoRecurring;
  payment_methods_allowed?: PaymentMethodsAllowed;
}
