import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type CreateRefund = {
  payment_id: string;
  body?: CreateRefundBody;
};

export declare type CreateRefundBody = {
  amount: number;
};

export declare type CreateRefundRequest = {
  payment_id: string;
  body?: CreateRefundBody;
  config: MercadoPagoConfig
};
