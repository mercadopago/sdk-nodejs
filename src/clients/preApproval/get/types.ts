import type { Options } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type PreApprovalGetRequest = {
  id: string;
  requestOptions?: Options;
}

export declare type GetPreApprovalRequest = {
  id: string;
  config: MercadoPagoConfig
}

