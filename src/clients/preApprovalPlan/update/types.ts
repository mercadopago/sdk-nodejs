import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalPlanRequest } from '@src/clients/preApprovalPlan/commonTypes';
import type { Options } from '@src/types';

export declare type PreApprovalPlanId = {
  preApprovalPlanId: string;
};

export declare type UpdatePreApprovalPlanUpdateClient = {
  id: string;
  updatePreApprovalPlanRequest: PreApprovalPlanRequest;
  config: MercadoPagoConfig
};

export declare type UpdatePreApprovalPlanUpdateData = {
  id: string;
  updatePreApprovalPlanRequest: PreApprovalPlanRequest;
  requestOptions?: Options;
}
