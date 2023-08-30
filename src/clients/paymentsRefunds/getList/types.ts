import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type GetRefundList = {
  payment_id: string
};

export declare type GetRefundByPaymentId = {
  payment_id: string
  config: MercadoPagoConfig
};
