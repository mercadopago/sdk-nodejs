/**
 * Shared response and domain types for the Payments API.
 *
 * These types model the JSON shapes returned by `GET /v1/payments/:id`,
 * `POST /v1/payments`, and related endpoints.  They are consumed by
 * every payment operation module (create, get, search, cancel, capture).
 *
 * @module clients/payment/commonTypes
 */
import { ApiResponse } from '@src/types';
import { RefundResponse } from '../paymentRefund/commonTypes';
import type { Address, Items, Tax } from '../commonTypes';

/**
 * Merchant account reference used for payment routing in marketplace flows.
 */
export declare type MerchantAccount = {
  /** Unique identifier of the merchant account to route funds to. */
  merchant_account_id?: string;
};

/**
 * Early-payment discount offered on boleto/ticket payment methods.
 */
export declare type Discount = {
  /** Discount type (e.g. `fixed`, `percentage`). */
  type?: string;
  /** Discount value in the transaction currency or as a percentage. */
  value?: number;
  /** Last date the discount is valid (ISO 8601). */
  limit_date?: string;
};

/**
 * Fee or interest charge applied to a boleto/ticket payment method.
 */
export declare type Fee = {
  /** Fee type (e.g. `percentage`, `fixed`). */
  type?: string;
  /** Fee amount or rate. */
  value?: number;
};

/**
 * Payment rules governing discounts, fines, and interest for boleto/ticket methods.
 */
export declare type Rules = {
  /** Early-payment discounts. */
  discounts?: Array<Discount>
  /** Late-payment fine. */
  fine?: Fee;
  /** Late-payment interest. */
  interest?: Fee;
};

/**
 * Extended data attached to a {@link PaymentMethod}, including routing
 * information, payment rules, and external references.
 */
export declare type Data = {
  /** Routing configuration for marketplace split payments. */
  routing_data?: MerchantAccount;
  /** Rules for discounts, fines, and interest (boleto/ticket). */
  rules?: Rules;
  /** Reference identifier assigned by the payment method provider. */
  reference_id?: string;
  /** External reference identifier supplied by the integrator. */
  external_reference_id?: string;
  /** URL to an external resource related to this payment (e.g. boleto PDF). */
  external_resource_url?: string;
};

/**
 * Payment method used to process the payment.
 */
export declare type PaymentMethod = {
  /** Payment method identifier (e.g. `visa`, `pix`, `bolbradesco`). */
  id?: string;
  /** Payment method category (e.g. `credit_card`, `debit_card`, `ticket`). */
  type?: string;
  /** Card issuer identifier. */
  issuer_id?: string;
  /** Extended payment-method data (routing, rules, references). */
  data?: Data;
}

/**
 * Identification document in a payment response context.
 */
export declare type Identification = {
  /** Document type code (e.g. `CPF`, `DNI`, `CNPJ`). */
  type?: string;
  /** Document number as a string to preserve leading zeros. */
  number?: string;
}

/**
 * Phone number with optional extension.
 */
export declare type Phone = {
  /** Area or country dialling code. */
  area_code?: string;
  /** Local phone number. */
  number?: string;
  /** Phone extension (for business lines). */
  extension?: string;
}

/**
 * Payer information as returned in a payment response.
 *
 * Contains personal data, identification, contact details, and
 * fraud-analysis signals.
 */
export declare type Payer = {
  /** Payer type (e.g. `customer`, `registered`, `guest`). */
  type?: string;
  /** MercadoPago unique payer identifier. */
  id?: string;
  /** Operator ID when the payer acts on behalf of another entity. */
  operator_id?: any;
  /** Payer e-mail address. */
  email?: string;
  /** Government-issued identification document. */
  identification?: Identification;
  /** Payer phone number. */
  phone?: Phone;
  /** Payer first name. */
  first_name?: string;
  /** Payer last name. */
  last_name?: string;
  /** Entity type: `individual` or `association`. */
  entity_type?: string;
  /** Payer billing address. */
  address?: Address;
  /** Authentication method used by the payer (e.g. `gmail`). */
  authentication_type?: string,
  /** Whether the payer has a MercadoPago Nivel 6 / loyalty subscription. */
  is_prime_user?: boolean,
  /** Whether this is the payer's first online purchase. */
  is_first_purchase_online?: boolean,
  /** Date the payer registered on the platform (ISO 8601). */
  registration_date?: string,
  /** Date of the payer's last purchase (ISO 8601). */
  last_purchase?: string,
}

/**
 * Supplementary payer data sent inside {@link AdditionalInfo}.
 *
 * Provides extra buyer details for fraud-prevention scoring.
 */
export declare type PayerAdditionalInfo = {
  /** Payer first name. */
  first_name?: string;
  /** Payer last name. */
  last_name?: string;
  /** Payer phone number. */
  phone?: Phone;
  /** Payer address. */
  address?: Address;
  /** Account registration date on the integrator's platform (ISO 8601). */
  registration_date?: string;
};

/**
 * Shipment information specific to a payment response.
 */
export declare type ShipmentsPayment = {
  /** Delivery destination address. */
  receiver_address?: ShipmentsReceiverAddress;
};

/**
 * Simplified receiver address returned inside a payment's shipment data.
 */
export declare type ShipmentsReceiverAddress = {
  /** Floor or level within the building. */
  floor?: string;
  /** Apartment or unit identifier. */
  apartment?: string;
  /** City name. */
  city_name?: string;
  /** State or province name. */
  state_name?: string;
};

/**
 * Additional information attached to a payment for fraud analysis.
 *
 * Contains the buyer's IP, item details, payer info, and shipping data.
 */
export declare type AdditionalInfo = {
  /** IP address of the buyer at the time of the purchase. */
  ip_address?: string;
  /** List of items included in the payment. */
  items?: Array<Items>;
  /** Supplementary payer data for fraud scoring. */
  payer?: PayerAdditionalInfo;
  /** Shipping details for the order. */
  shipments?: ShipmentsPayment;
};

/**
 * Financial details of the transaction as returned by the API.
 */
export declare type TransactionDetails = {
  /** Reference ID assigned by the payment method provider. */
  payment_method_reference_id?: string;
  /** Reference assigned by the acquirer / processor. */
  acquirer_reference?: string;
  /** Net amount received by the collector after fees. */
  net_received_amount?: number;
  /** Total amount paid by the buyer (including shipping and fees). */
  total_paid_amount?: number;
  /** Amount overpaid beyond the transaction amount. */
  overpaid_amount?: number;
  /** URL to an external resource (e.g. boleto PDF or payment voucher). */
  external_resource_url?: string;
  /** Amount of each instalment. */
  installment_amount?: number;
  /** Name of the financial institution processing the payment. */
  financial_institution?: string;
  /** Deferral period before the payment becomes payable to the collector. */
  payable_deferral_period?: any;
  /** Unique transaction identifier within the processor. */
  transaction_id?: string;
  /** Barcode data for boleto / ticket payment methods. */
  barcode?: Barcode;
  /** Human-readable digitable line for boleto payments. */
  digitable_line?: string;
  /** Verification code for the payment. */
  verification_code?: string;
  /** Bank transfer identifier (when applicable). */
  bank_transfer_id?: string;
}

/**
 * Barcode data for boleto or ticket-based payment methods.
 */
export declare type Barcode = {
  /** Raw barcode content string. */
  content?: string;
}

/**
 * Breakdown of a single fee charged on the payment.
 */
export declare type FeeDetails = {
  /** Fee type (e.g. `mercadopago_fee`, `coupon_fee`, `financing_fee`). */
  type?: string;
  /** Fee amount in the transaction currency. */
  amount?: number;
  /** Who absorbs the fee: `collector` or `payer`. */
  fee_payer?: string;
};

/**
 * Source and destination accounts involved in a charge.
 */
export declare type Accounts = {
  /** Origin account identifier. */
  from?: string;
  /** Destination account identifier. */
  to?: string;
}

/**
 * Original and refunded amounts for a marketplace charge.
 */
export declare type Amounts = {
  /** Original charged amount. */
  original?: number;
  /** Total amount refunded so far. */
  refunded?: number;
}

/**
 * Detailed information about a marketplace charge applied to the payment.
 */
export declare type ChargesDetails = {
  /** Unique charge identifier. */
  id?: string;
  /** Human-readable charge name. */
  name?: string;
  /** Charge type (e.g. `fee`, `financing`). */
  type?: string;
  /** Source and destination accounts for the charge movement. */
  accounts?: Accounts;
  /** Application (client) ID that originated the charge. */
  client_id?: number;
  /** Charge creation timestamp (ISO 8601). */
  date_created?: string;
  /** Last update timestamp (ISO 8601). */
  last_updated?: string;
  /** Original and refunded amounts for this charge. */
  amounts?: Amounts;
  /** Arbitrary metadata attached to the charge. */
  metadata?: any;
  /** Reserve identifier if the charge is held in reserve. */
  reserve_id?: any;
  /** Refund records associated with this charge. */
  refund_charges?: any[];
}

/**
 * Cardholder identity as recorded on the payment card.
 */
export declare type Cardholder = {
  /** Full name as printed on the card. */
  name?: string;
  /** Cardholder identification document. */
  identification?: Identification;
}

/**
 * Card details associated with a card-based payment.
 *
 * Sensitive data is masked; only the first six and last four digits are exposed.
 */
export declare type Card = {
  /** Tokenized card identifier. */
  id?: string;
  /** First six digits (BIN) of the card number. */
  first_six_digits?: string;
  /** Last four digits of the card number. */
  last_four_digits?: string;
  /** Bank Identification Number (alias for first six digits). */
  bin?: string;
  /** Card expiration month (1-12). */
  expiration_month?: number;
  /** Card expiration year (four digits). */
  expiration_year?: number;
  /** Date the card was tokenized (ISO 8601). */
  date_created?: string;
  /** Last update to the card record (ISO 8601). */
  date_last_updated?: string;
  /** Name and identification of the cardholder. */
  cardholder?: Cardholder;
}

/**
 * Business context information within a {@link PointOfInteraction}.
 */
export declare type BusinessInfo = {
  /** Business unit (e.g. `online_payments`). */
  unit?: string;
  /** Business sub-unit (e.g. `checkout_pro`, `default`). */
  sub_unit?: string;
};

/**
 * Metadata about the application that initiated the payment.
 */
export declare type ApplicationData = {
  /** Application version string. */
  version?: string;
  /** Application name. */
  name?: string;
};

/**
 * Bank-related information for the payer in a bank-transfer payment.
 */
export declare type PayerBankInfo = {
  /** Payer e-mail address registered at the bank. */
  email?: string;
  /** Payer bank account identifier. */
  account_id?: number;
  /** Full name of the payer's bank. */
  long_name?: string;
};

/**
 * Bank-related information for the collector (seller) in a bank-transfer payment.
 */
export declare type CollectorBankInfo = {
  /** Collector bank account identifier. */
  account_id?: number;
  /** Full name of the collector's bank. */
  long_name?: string;
};

/**
 * Combined bank information for both sides of a bank-transfer payment.
 */
export declare type BankInfo = {
  /** Payer bank details. */
  payer?: PayerBankInfo;
  /** Collector bank details. */
  collector?: CollectorBankInfo;
  /** Whether the payer and collector share the same bank account owner. */
  is_same_bank_account_owner?: string;
};

/**
 * Transaction data related to the point of interaction (QR, PIX, etc.).
 */
export declare type TransactionData = {
  /** QR code content string (for QR-based payments). */
  qr_code?: string;
  /** Base64-encoded QR code image. */
  qr_code_base64?: string;
  /** Unique transaction identifier. */
  transaction_id?: string;
  /** Bank transfer identifier. */
  bank_transfer_id?: number;
  /** Financial institution code. */
  financial_institution?: number;
  /** Bank information for payer and collector. */
  bank_info?: BankInfo;
  /** URL to a printable payment ticket / voucher. */
  ticket_url?: string;
};

/**
 * Describes where and how the payment was initiated.
 *
 * Captures the channel (QR, deep-link, checkout), application metadata,
 * and transaction-specific data.
 */
export declare type PointOfInteraction = {
  /** Interaction type (e.g. `CHECKOUT`, `QR`, `OPENPLATFORM`). */
  type?: string;
  /** Interaction sub-type for further classification. */
  sub_type?: string;
  /** Identifier of the resource this payment is linked to. */
  linked_to?: string;
  /** Metadata about the originating application. */
  application_data?: ApplicationData;
  /** QR / PIX / ticket transaction data. */
  transaction_data?: TransactionData;
  /** Business context (unit / sub-unit). */
  business_info?: BusinessInfo;
};

/**
 * Reference to the order associated with this payment.
 */
export declare type PaymentOrder = {
  /** Order identifier. */
  id?: number;
  /** Order type (e.g. `mercadopago`, `mercadolibre`). */
  type?: string;
};

/**
 * 3-D Secure authentication information returned after a challenge flow.
 */
export declare type ThreeDSInfo = {
  /** URL to the external 3DS challenge page. */
  external_resource_url?: string;
  /** Challenge request (CReq) payload for 3DS 2.x. */
  creq?: string;
};

/**
 * Network-level transaction reference from the card network gateway.
 */
export declare type GatewayReference = {
  /** Transaction ID assigned by the card network (Visa, Mastercard, etc.). */
  network_transaction_id?: string;
};

/**
 * Gateway processing details (expanded field).
 */
export declare type Gateway = {
  /** Card-network reference data. */
  reference?: GatewayReference;
};

/**
 * Expanded response fields requested via the `expand` query parameter.
 */
export declare type Expanded = {
  /** Gateway-level details (available when `gateway` is expanded). */
  gateway?: Gateway;
};

/**
 * Full payment resource returned by the MercadoPago Payments API.
 *
 * Extends {@link ApiResponse} so the raw HTTP status and headers are
 * always available alongside the domain fields.
 */
export declare interface PaymentResponse extends ApiResponse {
  /** Unique payment identifier. */
  id?: number;
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
  /** Money release schedule type (e.g. standard, custom). */
  money_release_schema?: string;
  /** Current status of the money release (e.g. `released`, `pending`). */
  money_release_status?: string;
  /** Operation type (e.g. `regular_payment`, `recurring_payment`). */
  operation_type?: string;
  /** Card issuer identifier. */
  issuer_id?: string;
  /** Payment method identifier (e.g. `visa`, `pix`, `bolbradesco`). */
  payment_method_id?: string;
  /** Payment method category (e.g. `credit_card`, `debit_card`, `bank_transfer`). */
  payment_type_id?: string;
  /** Detailed payment method information. */
  payment_method?: PaymentMethod;
  /** Payment status (e.g. `approved`, `pending`, `rejected`, `cancelled`). */
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
  sponsor_id?: number;
  /** Authorization code returned by the card processor. */
  authorization_code?: string;
  /** Integrator identifier for certified integrations. */
  integrator_id?: string;
  /** Total tax amount applied to this payment. */
  taxes_amount?: number;
  /** Counter-currency code when the payment involves currency conversion. */
  counter_currency?: string;
  /** Shipping cost included in the payment. */
  shipping_amount?: number;
  /** SDK build version that generated this payment. */
  build_version?: string;
  /** Point-of-sale terminal identifier. */
  pos_id?: string;
  /** Physical store identifier. */
  store_id?: string;
  /** Platform identifier (set by MercadoPago). */
  platform_id?: string;
  /** Corporation identifier for multi-account setups. */
  corporation_id?: string;
  /** Payer (buyer) information. */
  payer?: Payer;
  /** Collector (seller) account identifier. */
  collector_id?: number;
  /** Arbitrary key-value metadata set by the integrator. */
  metadata?: any;
  /** Additional information for fraud analysis (items, IP, shipment). */
  additional_info?: AdditionalInfo;
  /** Order associated with this payment. */
  order?: PaymentOrder;
  /** Integrator-supplied external reference for reconciliation. */
  external_reference?: string;
  /** Gross amount of the transaction in the specified currency. */
  transaction_amount?: number;
  /** Cumulative amount refunded from this payment. */
  transaction_amount_refunded?: number;
  /** Discount coupon amount deducted from the transaction. */
  coupon_amount?: number;
  /** Differential pricing configuration identifier. */
  differential_pricing_id?: string;
  /** Deduction schema applied to the payment. */
  deduction_schema?: string;
  /** Number of instalments chosen by the buyer. */
  installments?: number;
  /** Financial breakdown of the transaction. */
  transaction_details?: TransactionDetails;
  /** Itemized list of fees charged on the payment. */
  fee_details?: Array<FeeDetails>;
  /** Marketplace charges applied to the payment. */
  charges_details?: Array<ChargesDetails>;
  /** Whether the authorized payment has been captured. */
  captured?: boolean;
  /** Whether the payment uses binary (approve/reject) mode with no pending state. */
  binary_mode?: boolean;
  /** Reference ID for call-for-authorize flows. */
  call_for_authorize_id?: string;
  /** Descriptor that appears on the buyer's card statement. */
  statement_descriptor?: string;
  /** Card details (masked) used for card-based payments. */
  card?: Card;
  /** Webhook URL where payment status updates are sent. */
  notification_url?: string;
  /** List of refunds issued against this payment. */
  refunds?: Array<RefundResponse>;
  /** Processing mode (e.g. `aggregator`, `gateway`). */
  processing_mode?: string;
  /** Merchant account identifier for gateway-mode payments. */
  merchant_account_id?: string;
  /** Merchant number assigned by the acquirer. */
  merchant_number?: string;
  /** Channel and context where the payment was initiated. */
  point_of_interaction?: PointOfInteraction;
  /** 3-D Secure authentication details (if a challenge was required). */
  three_ds_info?: ThreeDSInfo;
  /** URL the buyer is redirected to after the payment flow. */
  callback_url?: string;
  /** Promotional coupon code applied to the payment. */
  coupon_code?: string;
  /** Net amount received by the collector after all fees. */
  net_amount?: number;
  /** Identifier of the selected payment method option. */
  payment_method_option_id?: string;
  /** Tax lines applied to the payment. */
  taxes?: Array<Tax>
  /** Internal metadata used by MercadoPago systems (not for integrator use). */
  internal_metadata?: any;
  /** Expanded fields requested via the `expand` query parameter. */
  expanded?: Expanded;
}

