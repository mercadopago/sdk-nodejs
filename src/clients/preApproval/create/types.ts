import type { Options } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalRequest } from '@src/clients/preApproval/commonTypes';

export declare type PreApprovalCreateData = {
  body: PreApprovalRequest,
  requestOptions?: Options;
}

export declare type PreApprovalCreateClient = {
  body: PreApprovalRequest;
  config: MercadoPagoConfig
}

