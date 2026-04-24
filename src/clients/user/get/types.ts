/**
 * Request and response types for the user profile endpoint.
 *
 * Contains the full response structure for `GET /users/me`, including
 * nested types for address, phone, reputation, account status, and more.
 *
 * @module user/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Internal parameters passed to the `get` implementation function. */
export declare type UserGetClient = {
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/** Response representing the authenticated user's full profile. */
export declare interface UserResponse extends ApiResponse {
  /** Unique MercadoPago user ID. */
  id?: number;
  /** User's public nickname on the platform. */
  nickname?: string;
  /** ISO 8601 timestamp when the account was registered. */
  registration_date?: string;
  /** User's first name. */
  first_name?: string;
  /** User's last name. */
  last_name?: string;
  /** User's gender. */
  gender?: string;
  /** @deprecated Use `country_id` instead. Country code (typo in the API). */
  contry_id?: string;
  /** User's email address. */
  email?: string;
  /** Government-issued identification document. */
  identification?: Identification;
  /** User's registered address. */
  address?: Address;
  /** Primary phone number. */
  phone?: Phone;
  /** Secondary / alternative phone number. */
  alternative_phone?: AlternativePhone;
  /** Tags describing user attributes (e.g. `normal`, `credits`). */
  tags?: string[];
  /** Account type (e.g. `normal`, `car_dealer`). */
  user_type?: string;
  /** URL to the user's logo or avatar image. */
  logo?: string;
  /** Loyalty / MercadoPuntos balance. */
  points?: number;
  /** MercadoPago site identifier (e.g. `MLA`, `MLB`). */
  site_id?: string;
  /** Public profile URL on the marketplace. */
  permalink?: string;
  /** Seller's experience level. */
  seller_experience?: string;
  /** Billing preferences. */
  bill_data?: BillData;
  /** Seller reputation scores and transaction metrics. */
  seller_reputation?: SellerReputation;
  /** Buyer reputation scores and transaction metrics. */
  buyer_reputation?: BuyerReputation;
  /** Account status flags (email confirmation, billing, shopping cart). */
  status?: Status;
  /** Anonymized email used for secure communications. */
  secure_email?: string;
  /** Company / business details (for business accounts). */
  company?: Company;
  /** MercadoCredito credit information. */
  credit?: Credit;
  /** Request context metadata. */
  context?: Context;
  /** External registration identifiers. */
  registration_identifiers?: string[];
  /** Country code where the user is registered (ISO 3166-1). */
  country_id?: string;
}

/** User's government-issued identification document. */
export declare type Identification = {
  /** Document number. */
  number: string;
  /** Document type code (e.g. `CPF`, `DNI`). */
  type: string;
};

/** User's registered address. */
export declare type Address = {
  /** Full street address or null if not set. */
  address: string | null;
  /** City name or null if not set. */
  city: string | null;
  /** State / province name or null if not set. */
  state: string | null;
  /** Postal / ZIP code or null if not set. */
  zip_code: string | null;
};

/** Primary phone information including verification status. */
export declare type Phone = {
  /** Area / country dialling code. */
  area_code: string;
  /** Phone extension. */
  extension: string;
  /** Local phone number. */
  number: string;
  /** Whether the phone number has been verified. */
  verified: boolean;
};

/** Alternative / secondary phone number. */
export declare type AlternativePhone = {
  /** Area / country dialling code. */
  area_code: string;
  /** Phone extension. */
  extension: string;
  /** Local phone number. */
  number: string;
};

/** Billing preferences for the user account. */
export declare type BillData = {
  /** Whether the user accepts credit notes. */
  accept_credit_note?: string;
};

/** Seller reputation including level, power-seller status, and metrics. */
export declare type SellerReputation = {
  /** Reputation level identifier (e.g. `5_green`, `4_light_green`). */
  level_id: string | null;
  /** Power-seller tier or null if not a power seller. */
  power_seller_status: string | null;
  /** Seller transaction summary. */
  transactions: SellerReputationTransactions;
  /** Detailed seller performance metrics. */
  metrics: SellerReputationMetrics;
};

/** Seller performance metrics covering sales, claims, and cancellations. */
export declare type SellerReputationMetrics = {
  /** Sales volume metrics. */
  sales: SellerReputationMetricsSales;
  /** Claim rate metrics. */
  claims: SellerReputationMetricsRating;
  /** Late-handling-time rate metrics. */
  delayed_handling_time: SellerReputationMetricsRating;
  /** Cancellation rate metrics. */
  cancellations: SellerReputationMetricsRating;
};

/** Sales volume for a specific measurement period. */
export declare type SellerReputationMetricsSales = {
  /** Time period evaluated (e.g. `365 days`). */
  period: string;
  /** Number of completed sales. */
  completed: number;
};

/** Seller transaction summary for a measurement period. */
export declare type SellerReputationTransactions = {
  /** Number of cancelled transactions. */
  canceled: number;
  /** Number of successfully completed transactions. */
  completed: number;
  /** Time period evaluated (e.g. `historic`). */
  period: string;
  /** Breakdown of buyer ratings for the seller. */
  ratings: SellerReputationTransactionsRatings;
  /** Total number of transactions. */
  total: number;
};

/** Distribution of buyer ratings for a seller. */
export declare type SellerReputationTransactionsRatings = {
  /** Count of negative ratings. */
  negative: number;
  /** Count of neutral ratings. */
  neutral: number;
  /** Count of positive ratings. */
  positive: number;
};

/** Buyer reputation summary. */
export declare type BuyerReputation = {
  /** Number of transactions cancelled by the buyer. */
  canceled_transactions: number;
  /** Tags describing buyer behavior. */
  tags: string[];
  /** Buyer transaction summary. */
  transactions: BuyerReputationTransactions;
};

/** Buyer transaction summary for a measurement period. */
export declare type BuyerReputationTransactions = {
  /** Cancelled transactions (paid vs total). */
  canceled: BuyerReputationTransactionsWithoutUnits;
  /** Number of completed transactions. */
  completed: number | null;
  /** Transactions not yet rated by the buyer. */
  not_yet_rated: BuyerReputationTransactionsWithUnits;
  /** Time period evaluated. */
  period: string;
  /** Total number of transactions. */
  total: number | null;
  /** Transactions that will never be rated. */
  unrated: BuyerReputationTransactionsWithoutUnits;
};

/** Transaction count without unit breakdown. */
export declare type BuyerReputationTransactionsWithoutUnits = {
  /** Number of paid transactions. */
  paid: number | null;
  /** Total count. */
  total: number | null;
};

/** Transaction count with unit breakdown. */
export declare type BuyerReputationTransactionsWithUnits = {
  /** Number of paid transactions. */
  paid: number | null;
  /** Total count. */
  total: number | null;
  /** Number of units across all transactions. */
  units: number | null;
};

/** Account status flags and capabilities. */
export declare type Status = {
  /** Billing permission and restriction codes. */
  billing: StatusBilling;
  /** Buy permission and restriction codes. */
  buy: StatusAllowImmediatePayment;
  /** Whether the user has confirmed their email address. */
  confirmed_email: boolean;
  /** Shopping cart status for buying and selling. */
  shopping_cart: StatusShoppingCart;
  /** Whether immediate payment is required for listings. */
  immediate_payment: boolean;
  /** Listing permission and restriction codes. */
  list: StatusAllowImmediatePayment;
  /** MercadoEnvios shipping status. */
  mercadoenvios: string;
  /** MercadoPago account classification. */
  mercadopago_account_type: string;
  /** Whether the user has accepted MercadoPago terms and conditions. */
  mercadopago_tc_accepted: boolean;
  /** Required action the user must complete, or null. */
  required_action: string | null;
  /** Sell permission and restriction codes. */
  sell: StatusAllowImmediatePayment;
  /** Overall site status of the account. */
  site_status: string;
  /** User type classification. */
  user_type: string;
};

/** Billing permission status. */
export declare type StatusBilling = {
  /** Whether billing is allowed. */
  allow: boolean;
  /** Restriction codes, if any. */
  codes: string[];
};

/** Shopping cart status for buy and sell operations. */
export declare type StatusShoppingCart = {
  /** Shopping cart buy status. */
  buy: string;
  /** Shopping cart sell status. */
  sell: string;
};

/** Permission status with immediate-payment requirements. */
export declare type StatusAllowImmediatePayment = {
  /** Whether the operation is allowed. */
  allow: boolean;
  /** Restriction codes, if any. */
  codes: string[];
  /** Immediate-payment requirement details. */
  immediate_payment: StatusImmediatePayment;
};

/** Company / business information for business accounts. */
export declare type Company = {
  /** Trading / brand name. */
  brand_name: string;
  /** Municipal tax identification number. */
  city_tax_id: string;
  /** Registered corporate name. */
  corporate_name: string;
  /** Company identification number. */
  identification: string;
  /** State tax identification number. */
  state_tax_id: string;
  /** Customer type identifier. */
  cust_type_id: string;
  /** Soft descriptor shown on card statements. */
  soft_descriptor: string;
};

/** MercadoCredito credit information for the account. */
export declare type Credit = {
  /** Amount of credit consumed. */
  consumed: number;
  /** Credit level identifier. */
  credit_level_id: string;
  /** Credit rank within the level. */
  rank: string;
};

/** Request context metadata. */
export declare type Context = {
  /** IP address from which the request was made. */
  ip_address: string;
};

/** Rate-based reputation metric for a measurement period. */
export declare type SellerReputationMetricsRating = {
  /** Time period evaluated. */
  period: string;
  /** Rate as a decimal (0 to 1). */
  rate: number;
  /** Absolute count of occurrences. */
  value: number;
};

/** Immediate-payment requirement details. */
export declare type StatusImmediatePayment = {
  /** Reasons why immediate payment is or is not required. */
  reasons: string[];
  /** Whether immediate payment is required. */
  required: boolean;
};

/** Public input for {@link User.get}, accepted by the class facade. */
export declare type UserGetData = {
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
