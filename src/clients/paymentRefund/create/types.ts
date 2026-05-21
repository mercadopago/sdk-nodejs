import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentRefundCreateData = {
  payment_id: string | number;
  body?: CreateRefundBody;
  requestOptions?: Options;
};

export declare type CreateRefundBody = {
  amount?: number;
};

export declare type PaymentRefundCreateClient = {
  payment_id: string | number;
  body?: CreateRefundBody;
  config: MercadoPagoConfig
};
