import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalPlanRequest } from '@src/clients/preApprovalPlan/commonTypes';
import type { Options } from '@src/types';

export declare type PreApprovalPlanCreateClient = {
  body: PreApprovalPlanRequest;
  config: MercadoPagoConfig
};

export declare type PreApprovalPlanCreateData = {
  body: PreApprovalPlanRequest;
  requestOptions?: Options;
}
