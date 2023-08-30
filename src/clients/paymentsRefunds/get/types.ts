import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type GetRefund = {
  payment_id: string
  refund_id: string;
};

export declare type GetRefundByRefundId = {
  payment_id: string
  refund_id: string;
  config: MercadoPagoConfig
};
