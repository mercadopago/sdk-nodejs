import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PreApprovalPlanGetClient = {
  id: string;
  config: MercadoPagoConfig
};

export declare type PreApprovalPlanGetData = {
  preApprovalPlanId: string;
  requestOptions?: Options;
};
