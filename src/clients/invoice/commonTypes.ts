/**
 * Shared domain types for the Invoice (subscription billing) client.
 *
 * Contains the response structures returned by the authorized-payments
 * endpoints used to query subscription invoices.
 *
 * @module invoice/commonTypes
 */

/** Payment information embedded within an invoice. */
export declare type InvoicePayment = {
  /** Unique payment identifier. */
  id: string;
  /** Payment status (e.g. `approved`, `rejected`, `pending`). */
  status: string;
  /** Detailed reason for the current payment status. */
  status_detail: string;
};

/** Response representing a single subscription invoice (authorized payment). */
export declare type InvoiceResponse = {
  /** ISO 4217 currency code (e.g. `ARS`, `BRL`). */
  currency_id?: string;
  /** ISO 8601 timestamp when the invoice was created. */
  date_created?: string;
  /** Scheduled debit date for the recurring charge. */
  debit_date?: string;
  /** Integrator's external reference for reconciliation. */
  external_reference?: string;
  /** Unique invoice identifier. */
  id?: string;
  /** ISO 8601 timestamp of the last modification. */
  last_modified?: string;
  /** MercadoPago user ID of the payer (subscriber). */
  payer_id?: number;
  /** Payment details associated with this invoice. */
  payment?: InvoicePayment;
  /** Identifier of the preapproval (subscription plan) that generated this invoice. */
  preapproval_id?: string;
  /** Descriptive reason or title for the charge. */
  reason?: string;
  /** Number of retry attempts made to collect this invoice. */
  retry_attempt?: number,
  /** Invoice status (e.g. `scheduled`, `processed`, `recycling`). */
  status?: string;
  /** Summary information for the invoice. */
  summarized?: string;
  /** Amount charged to the subscriber. */
  transaction_amount?: number;
  /** Invoice type identifier. */
  type?: string;
}
