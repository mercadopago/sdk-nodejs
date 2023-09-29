import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PreApprovalPlansGetClient = {
  id: string;
  config: MercadoPagoConfig
};

export declare type PreApprovalPlansGetData = {
  preApprovalPlanId?: string;
  requestOptions?: Options;
};
