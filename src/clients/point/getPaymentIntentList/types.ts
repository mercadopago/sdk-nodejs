import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type Search = {
  filters?: GetPaymentIntentList;
  config: MercadoPagoConfig;
};

export declare type GetPaymentIntentListRequest = {
  filters?: GetPaymentIntentList;
};

export declare type GetPaymentIntentList = {
  startDate: string;
  endDate: string;
};
