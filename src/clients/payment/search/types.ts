/**
 * Types for the search-payments operation (`GET /v1/payments/search`).
 *
 * Defines the query-parameter options, the paginated response envelope,
 * and the summarized payment records returned by the search endpoint.
 *
 * @module clients/payment/search/types
 */
import type { Identification } from '@src/clients/commonTypes';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, SearchOptions } from '@src/types';

/**
 * Internal client payload passed to the search-payments function.
 */
export declare type PaymentSearchClient = {
  /** Search filters, sorting, and pagination parameters. */
  options?: PaymentSearchOptions,
  /** SDK configuration including the access token. */
  config: MercadoPagoConfig
};

/**
 * Paginated response returned by the payment search endpoint.
 */
export declare type PaymentSearch = {
  /** Pagination metadata (total count, limit, offset). */
  paging?: PaymentSearchPaging;
  /** List of payments matching the search criteria. */
  results?: Array<PaymentSearchResult>;
};

/**
 * Summarized payment record returned within search results.
 *
 * Contains the most common fields; for full details use {@link Payment.get}.
 */
export declare type PaymentSearchResult = {
  /** Unique payment identifier. */
  id?: string;
  /** Payment creation timestamp (ISO 8601). */
  date_created?: string;
  /** Timestamp when the payment was approved (ISO 8601). */
  date_approved?: string;
  /** Last modification timestamp (ISO 8601). */
  date_last_updated?: string;
  /** Expiration date after which the payment can no longer be paid (ISO 8601). */
  date_of_expiration?: string;
  /** Date when the funds will be released to the collector (ISO 8601). */
  money_release_date?: string;
  /** Operation type (e.g. `regular_payment`, `recurring_payment`). */
  operation_type?: string;
  /** Card issuer identifier. */
  issuer_id?: string;
  /** Payment method identifier (e.g. `visa`, `pix`). */
  payment_method_id?: string;
  /** Payment method category (e.g. `credit_card`, `debit_card`). */
  payment_type_id?: string;
  /** Payment status (e.g. `approved`, `pending`, `rejected`). */
  status?: string;
  /** Granular status reason (e.g. `accredited`, `cc_rejected_high_risk`). */
  status_detail?: string;
  /** ISO 4217 currency code of the transaction. */
  currency_id?: string;
  /** Payment description shown to the buyer. */
  description?: string;
  /** `true` when the payment was created in production mode. */
  live_mode?: boolean;
  /** Sponsor (marketplace owner) account identifier. */
  sponsor_id?: string;
  /** Authorization code returned by the card processor. */
  authorization_code?: string;
  /** Money release schedule type. */
  money_release_schema?: string;
  /** Counter-currency code when currency conversion applies. */
  counter_currency?: string;
  /** Collector (seller) account identifier. */
  collector_id?: string;
  /** Payer (buyer) summary. */
  payer?: Payer;
  /** Arbitrary key-value metadata set by the integrator. */
  metadata?: any;
  /** Additional information for fraud analysis. */
  additional_info?: any;
  /** Integrator-supplied external reference for reconciliation. */
  external_reference?: string;
  /** Gross amount of the transaction. */
  transaction_amount?: number;
  /** Cumulative amount refunded from this payment. */
  transaction_amount_refunded?: number;
  /** Discount coupon amount deducted from the transaction. */
  coupon_amount?: number;
  /** Differential pricing configuration identifier. */
  differential_pricing_id?: string;
  /** Deduction schema applied to the payment. */
  deduction_schema?: string;
  /** Financial breakdown of the transaction. */
  transaction_details?: TransactionDetails;
  /** Whether the authorized payment has been captured. */
  captured?: boolean;
  /** Whether the payment uses binary (approve/reject) mode. */
  binary_mode?: boolean;
  /** Reference ID for call-for-authorize flows. */
  call_for_authorize_id?: string;
  /** Text that appears on the buyer's card statement. */
  statement_descriptor?: string;
  /** Number of instalments chosen by the buyer. */
  installments?: number;
  /** Card details (masked). */
  card?: any;
  /** Webhook URL for payment status notifications. */
  notification_url?: string;
  /** Processing mode (e.g. `aggregator`, `gateway`). */
  processing_mode?: string;
  /** Merchant account identifier for gateway-mode payments. */
  merchant_account_id?: string;
  /** Acquirer name. */
  acquirer?: string;
  /** Merchant number assigned by the acquirer. */
  merchant_number?: string;
};

/**
 * Summarized payer information within a search result.
 */
export declare type Payer = {
  /** MercadoPago unique payer identifier. */
  id: string;
  /** Payer e-mail address. */
  email: string;
  /** Government-issued identification document. */
  identification: Identification;
  /** Payer type (e.g. `registered`, `guest`). */
  type: string;
};

/**
 * Transaction financial details within a search result.
 */
export declare type TransactionDetails = {
  /** Net amount received by the collector after fees. */
  net_received_amount: number;
  /** Total amount paid by the buyer. */
  total_paid_amount: number;
  /** Amount overpaid beyond the transaction amount. */
  overpaid_amount: number;
  /** URL to an external resource (e.g. boleto PDF). */
  external_resource_url: string;
  /** Amount of each instalment. */
  installment_amount: number;
  /** Financial institution that processed the payment. */
  financial_institution: string;
  /** Reference ID assigned by the payment method provider. */
  payment_method_reference_id: string;
  /** Deferral period before the payment becomes payable. */
  payable_deferral_period: string;
  /** Reference assigned by the acquirer / processor. */
  acquirer_reference: string;
  /** Unique transaction identifier within the processor. */
  transaction_id?: string;
};

/**
 * Pagination metadata for search results.
 */
export declare type PaymentSearchPaging = {
  /** Total number of payments matching the query. */
  total: number;
  /** Maximum number of results returned in this page. */
  limit: number;
  /** Zero-based offset of the current page. */
  offset: number;
};

/**
 * Query-parameter options for the payment search endpoint.
 *
 * Extends the base {@link SearchOptions} with payment-specific sorting,
 * date-range filtering, and external-reference lookups.
 */
export declare interface PaymentSearchOptions extends SearchOptions {
  /** Field to sort results by. */
  sort?: 'date_approved' | 'date_created' | 'date_last_updated' | 'money_release_date';
  /** Sort direction. */
  criteria?: 'asc' | 'desc';
  /** Filter by the integrator-supplied external reference. */
  external_reference?: string;
  /** Date field to apply the `begin_date` / `end_date` range filter on. */
  range?: 'date_created' | 'date_last_updated' | 'date_approved' | 'money_release_date' | 'date_created';
  /** Start of the date range filter (ISO 8601). */
  begin_date?: string;
  /** End of the date range filter (ISO 8601). */
  end_date?: string;
}

/**
 * Public-facing input accepted by {@link Payment.search}.
 */
export declare type PaymentSearchData = {
  /** Search filters, sorting, and pagination parameters. */
  options?: PaymentSearchOptions;
  /** Per-request option overrides (timeout, headers, etc.). */
  requestOptions?: Options;
}