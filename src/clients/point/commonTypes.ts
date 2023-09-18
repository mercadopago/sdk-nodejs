import { Paging } from '../commonTypes';

export declare type CancelPaymentIntentResponse = {
  id?: string;
};

export declare type PaymentIntentStatusResponse = {
  status?: string;
  created_on?: string;
};

export declare type GetPaymentIntentListResponse = {
  events: Array<Event>;
};

export declare type Event = {
  payment_intent_id: string;
  status: string;
  created_on: string;
};

export declare type GetDevicesResponse = {
  devices: Array<Device>;
  paging: Paging;
};

export declare type Device = {
  payment_intent_id: string;
  status: string;
  created_on: string;
};

export declare type ChangeDeviceOperatingModeResponse = {
  operating_mode?: string;
};

export declare type PaymentIntentResponse = {
  additional_info?: AdditionalInfo;
  amount?: number;
  description?: string;
  device_id?: string;
  id?: string;
  payment?: Payment;
  payment_mode?: string;
  state?: string;
};

export declare type PaymentIntentRequest = {
  additional_info?: AdditionalInfo;
  amount: number;
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
