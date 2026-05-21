export declare type InvoicePayment = {
  id: string;
  status: string;
  status_detail: string;
};

export declare type InvoiceResponse = {
  currency_id?: string;
  date_created?: string;
  debit_date?: string;
  external_reference?: string;
  id?: string;
  last_modified?: string;
  payer_id?: number;
  payment?: InvoicePayment;
  preapproval_id?: string;
  reason?: string;
  retry_attempt?: number,
  status?: string;
  summarized?: string;
  transaction_amount?: number;
  type?: string;
}
