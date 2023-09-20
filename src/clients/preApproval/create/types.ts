import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalRequest } from '@src/clients/preApproval/commonTypes';

export declare type CreatePreApprovalRequest = {
  body: PreApprovalRequest;
  config: MercadoPagoConfig
};

