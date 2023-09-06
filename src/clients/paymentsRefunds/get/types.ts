import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type GetRefund = {
  payment_id: string
  refund_id: string;
};

export declare type Get = {
  payment_id: string
  refund_id: string;
  config: MercadoPagoConfig
};
