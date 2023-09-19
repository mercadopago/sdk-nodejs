import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalRequest } from '@src/clients/preApproval/commonTypes';

export declare type CreatePreApprovalRequest = {
  preApprovalRequest: PreApprovalRequest;
  config: MercadoPagoConfig
};

