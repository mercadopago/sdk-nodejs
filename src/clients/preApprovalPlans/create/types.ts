import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalPlanRequest } from '@src/clients/preApprovalPlans/commonTypes';
import type { Options } from '@src/types';

export declare type PreApprovalPlansCreateClient = {
  body: PreApprovalPlanRequest;
  config: MercadoPagoConfig
};

export declare type PreApprovalPlansCreateData = {
  body?: PreApprovalPlanRequest;
  requestOptions?: Options;
}
