import type { Options } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalRequest } from '@src/clients/preApproval/commonTypes';

export declare type PreApprovalCreateRequest = {
  body: PreApprovalRequest,
  requestOptions?: Options;
}

export declare type CreatePreApprovalRequest = {
  body: PreApprovalRequest;
  config: MercadoPagoConfig
}

