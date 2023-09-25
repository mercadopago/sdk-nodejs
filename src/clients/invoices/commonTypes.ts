export declare type InvoicesPayment = {
  id: string;
  status: string;
  status_detail: string;
};

export declare type InvoicesResponse = {
  currency_id?: string;
  date_created?: string;
  debit_date?: string;
  external_reference?: string;
  id?: string;
  last_modified?: string;
  payer_id?: number;
  payment?: InvoicesPayment;
  preapproval_id?: string;
  reason?: string;
  retry_attempt?: number,
  status?: string;
  summarized?: string;
  transaction_amount?: number;
  type?: string;
}