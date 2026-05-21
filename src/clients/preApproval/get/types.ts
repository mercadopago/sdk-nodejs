import type { Options } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type PreApprovalGetData = {
  id: string;
  requestOptions?: Options;
}

export declare type PreApprovalGetClient = {
  id: string;
  config: MercadoPagoConfig
}

