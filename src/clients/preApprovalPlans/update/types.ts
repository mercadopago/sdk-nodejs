import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalPlanRequest } from '@src/clients/preApprovalPlans/commonTypes';

export declare type PreApprovalPlanId = {
  preApprovalPlanId: string;
};

export declare type UpdatePreApprovalPlan = {
  id: string;
  updatePreApprovalPlanRequest: PreApprovalPlanRequest;
  config: MercadoPagoConfig
};

export declare type UpdatePreApprovalPlanRequest = {
  id: string;
  updatePreApprovalPlanRequest: PreApprovalPlanRequest;
}
