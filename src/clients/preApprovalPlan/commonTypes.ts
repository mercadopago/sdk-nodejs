/**
 * Shared request and response types for the Subscription Plan (PreApprovalPlan) client.
 *
 * These types model the JSON payloads accepted and returned by the
 * `/preapproval_plan` API endpoints. They describe auto-recurring
 * billing schedules, free-trial periods, allowed payment methods,
 * and the full plan response.
 *
 * @module clients/preApprovalPlan/commonTypes
 */

import type { ApiResponse } from '@src/types';

/**
 * Recurring billing schedule for a subscription plan.
 *
 * Defines the charge frequency, amount, optional repetition cap,
 * billing day, and free-trial period.
 */
export declare type AutoRecurring = {
  /** Number of `frequency_type` units between each charge. */
  frequency?: number;
  /** Time unit for the billing cycle (`days` or `months`). */
  frequency_type?: string;
  /** Amount charged per billing cycle in the specified currency. */
  transaction_amount?: number;
  /** ISO 4217 currency code (e.g. `ARS`, `BRL`). */
  currency_id?: string;
  /** Maximum number of billing cycles before the plan expires. */
  repetitions?: number;
  /** Day of the month on which the charge occurs (1--28). */
  billing_day?: number;
  /** Whether the first charge is prorated to align with `billing_day`. */
  billing_day_proportional?: boolean;
  /** Optional free-trial period before charges begin. */
  free_trial?: FreeTrial;
};

/**
 * Free-trial configuration preceding the first charge on a plan.
 */
export declare type FreeTrial = {
  /** Number of `frequency_type` units the trial lasts. */
  frequency: number;
  /** Time unit for the trial duration (`days` or `months`). */
  frequency_type: string;
  /** Offset in days before the first invoice after the trial ends. */
  first_invoice_offset?: number
};

/**
 * Restrictions on which payment types and methods subscribers can use.
 */
export declare type PaymentMethodsAllowed = {
  /** Allowed payment type categories (e.g. `credit_card`). */
  payment_types?: Array<PaymentType>;
  /** Allowed specific payment methods (e.g. `visa`, `master`). */
  payment_methods?:  Array<PaymentMethod>;
};

/**
 * Payment type category identifier.
 */
export declare type PaymentType = {
  /** Payment type identifier (e.g. `credit_card`, `debit_card`, `ticket`). */
  id?: string;
};

/**
 * Specific payment method identifier.
 */
export declare type PaymentMethod = {
  /** Payment method identifier (e.g. `visa`, `master`, `amex`). */
  id?: string;
};

/**
 * Request body for creating or updating a subscription plan template.
 */
export declare type PreApprovalPlanRequest = {
  /** URL the buyer returns to after subscribing. */
  back_url?: string;
  /** Human-readable plan name or description shown to the buyer. */
  reason?: string;
  /** Desired plan status (e.g. `active`, `inactive`). */
  status?: string;
  /** Recurring billing schedule configuration. */
  auto_recurring?: AutoRecurring;
  /** Restrictions on which payment methods subscribers may use. */
  payment_methods_allowed?: PaymentMethodsAllowed;
};

/**
 * API response returned when creating, retrieving, or updating a subscription plan.
 *
 * Extends the standard {@link ApiResponse} envelope with all plan fields
 * plus server-generated values such as `id`, `init_point`, and `date_created`.
 */
export declare interface PreApprovalPlanResponse extends ApiResponse {
  /** Unique plan identifier assigned by MercadoPago. */
  id?: string;
  /** URL the buyer returns to after subscribing. */
  back_url?: string;
  /** Auto-return behaviour after the buyer subscribes. */
  auto_return?: string;
  /** Seller (collector) MercadoPago account identifier. */
  collector_id?: number;
  /** OAuth application identifier that created this plan. */
  application_id?: number;
  /** Human-readable plan name or description. */
  reason?: string;
  /** Current plan status (`active`, `inactive`). */
  status?: string;
  /** ISO 8601 timestamp when the plan was created. */
  date_created?: string;
  /** ISO 8601 timestamp of the last modification. */
  last_modified?: string;
  /** URL to redirect buyers to subscribe to this plan. */
  init_point?: string;
  /** Recurring billing schedule details. */
  auto_recurring?: AutoRecurring;
  /** Payment method restrictions for this plan. */
  payment_methods_allowed?: PaymentMethodsAllowed;
}
