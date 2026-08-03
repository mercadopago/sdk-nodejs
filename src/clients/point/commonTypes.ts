/**
 * Shared domain types for the Point (Smart POS) client.
 *
 * Contains response interfaces, request payloads, and supporting types
 * used across payment-intent and device operations in the Point
 * Integration API.
 *
 * @module point/commonTypes
 */

import type { ApiResponse } from '@src/types';
import type { Paging } from '../commonTypes';

/** Response returned when a payment intent is successfully cancelled. */
export declare interface CancelPaymentIntentResponse extends ApiResponse {
  /** Unique identifier of the cancelled payment intent. */
  id?: string;
}

/** Response containing the current status of a payment intent event. */
export declare interface PaymentIntentStatusResponse extends ApiResponse {
  /** Current lifecycle status of the payment intent (e.g. `finished`, `open`). */
  status?: string;
  /** ISO 8601 timestamp when the status event was created. */
  created_on?: string;
}

/** Response containing a list of payment intent events. */
export declare interface GetPaymentIntentListResponse extends ApiResponse {
  /** Array of payment intent lifecycle events. */
  events?: Array<Event>;
}

/** A single payment intent lifecycle event. */
export declare type Event = {
  /** Unique identifier of the payment intent. */
  payment_intent_id: string;
  /** Status at the time this event was recorded. */
  status: string;
  /** ISO 8601 timestamp when the event occurred. */
  created_on: string;
};

/** Response containing a paginated list of Point devices. */
export declare interface GetDevicesResponse extends ApiResponse {
  /** Array of Point devices registered to the account. */
  devices?: Array<Device>;
  /** Pagination metadata for the device list. */
  paging?: Paging;
}

/** A Point device (Smart POS terminal) registered to the seller's account. */
export declare type Device = {
  /** Payment intent identifier currently associated with this device. */
  payment_intent_id: string;
  /** Current device status (e.g. `ACTIVE`, `INACTIVE`). */
  status: string;
  /** ISO 8601 timestamp when the device record was created. */
  created_on: string;
};

/** Response returned after changing a Point device's operating mode. */
export declare interface ChangeDeviceOperatingModeResponse extends ApiResponse {
  /** The new operating mode of the device (e.g. `PDV`, `STANDALONE`). */
  operating_mode?: string;
}

/** Response representing a created or retrieved payment intent on a Point device. */
export declare interface PaymentIntentResponse extends ApiResponse {
  /** Extra metadata such as external reference and print settings. */
  additional_info?: AdditionalInfo;
  /** Total amount to charge in the smallest currency unit. */
  amount?: number;
  /** Human-readable description shown on the POS terminal screen. */
  description?: string;
  /** Unique identifier of the Point device processing this intent. */
  device_id?: string;
  /** Unique identifier of the payment intent. */
  id?: string;
  /** Payment configuration (installments, type, voucher). */
  payment?: Payment;
  /** Mode in which the payment is processed. */
  payment_mode?: string;
  /** Current state of the payment intent (e.g. `OPEN`, `FINISHED`, `CANCELED`). */
  state?: string;
}

/** Request body for creating a new payment intent on a Point device. */
export declare type PaymentIntentRequest = {
  /** Extra metadata such as external reference and print settings. */
  additional_info?: AdditionalInfo;
  /** Total amount to charge in the smallest currency unit. */
  amount?: number;
  /** Human-readable description shown on the POS terminal screen. */
  description?: string;
  /** Payment configuration (installments, type, voucher). */
  payment?: Payment;
};

/** Additional metadata attached to a payment intent. */
export declare type AdditionalInfo = {
  /** Integrator's own reference ID for reconciliation. */
  external_reference?: string;
  /** Whether to print a receipt on the Point terminal after payment. */
  print_on_terminal?: boolean;
};

/** Payment configuration for installment and voucher settings. */
export declare type Payment = {
  /** Number of installments for the payment (1 = single payment). */
  installments?: number;
  /** Who absorbs the installment cost: `seller` or `buyer`. */
  installments_cost?: string;
  /** Payment type (e.g. `credit_card`, `debit_card`). */
  type?: string;
  /** Voucher type when the payment uses a food or fuel voucher. */
  voucher_type?: string;
};
