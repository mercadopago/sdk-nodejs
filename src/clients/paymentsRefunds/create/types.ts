import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentsRefoundsCreateData = {
  payment_id?: string;
  body?: CreateRefundBody;
  requestOptions?: Options;
};

export declare type CreateRefundBody = {
  amount?: number;
};

export declare type PaymentsRefoundsCreateClient = {
  payment_id: string;
  body?: CreateRefundBody;
  config: MercadoPagoConfig
};
