import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalPlanRequest } from '@src/clients/preApprovalPlans/commonTypes';

export declare type CreatePreApprovalPlanRequest = {
  preApprovalPlanRequest: PreApprovalPlanRequest;
  config: MercadoPagoConfig
};
