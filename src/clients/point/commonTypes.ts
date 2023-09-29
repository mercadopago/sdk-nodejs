import type { ApiResponse } from '@src/types';
import type { Paging } from '../commonTypes';

export declare interface CancelPaymentIntentResponse extends ApiResponse {
  id?: string;
}

export declare interface PaymentIntentStatusResponse extends ApiResponse {
  status?: string;
  created_on?: string;
}

export declare interface GetPaymentIntentListResponse extends ApiResponse {
  events?: Array<Event>;
}

export declare type Event = {
  payment_intent_id: string;
  status: string;
  created_on: string;
};

export declare interface GetDevicesResponse extends ApiResponse {
  devices?: Array<Device>;
  paging?: Paging;
}

export declare type Device = {
  payment_intent_id: string;
  status: string;
  created_on: string;
};

export declare interface ChangeDeviceOperatingModeResponse extends ApiResponse {
  operating_mode?: string;
}

export declare interface PaymentIntentResponse extends ApiResponse {
  additional_info?: AdditionalInfo;
  amount?: number;
  description?: string;
  device_id?: string;
  id?: string;
  payment?: Payment;
  payment_mode?: string;
  state?: string;
}

export declare type PaymentIntentRequest = {
  additional_info?: AdditionalInfo;
  amount?: number;
  description?: string;
  payment?: Payment;
};

export declare type AdditionalInfo = {
  external_reference?: string;
  print_on_terminal?: boolean;
};

export declare type Payment = {
  installments?: number;
  installments_cost?: string;
  type?: string;
  voucher_type?: string;
};
