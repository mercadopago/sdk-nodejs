export declare type AutoRecurringRequest = {
  frequency: number;
  frequency_type: string;
  start_date?: string;
  end_date?: string;
  transaction_amount?: number;
  currency_id: string;
};

export declare type AutoRecurringResponse = {
  frequency: number;
  frequency_type: string;
  transaction_amount?: number;
  currency_id: string;
  free_trial: string | null;
};

export declare type PreApprovalRequest = {
  auto_recurring?: AutoRecurringRequest;
  back_url: string;
  card_token_id?: string;
  external_reference?: string;
  payer_email: string;
  preapproval_plan_id?: string;
  reason: string;
  status?: string;
};

export declare type SummarizedResponse = {
  quotas: string | null,
  charged_quantity: number | null,
  pending_charge_quantity: number | null,
  charged_amount: number | null,
  pending_charge_amount: number | null,
  semaphore: string | null,
  last_charged_date: string | null,
  last_charged_amount: string | null
};

export declare type PreApprovalResponse = {
  id: string;
  payer_id: number;
  payer_email: string;
  collector_id: number;
  application_id: number;
  status: string;
  reason: string;
  external_reference: string;
  date_created: string;
  last_modified: string;
  init_point: string;
  auto_recurring: AutoRecurringResponse;
  summarized: SummarizedResponse;
  payment_method_id: string | null;
  first_invoice_offset: string | null;
};
