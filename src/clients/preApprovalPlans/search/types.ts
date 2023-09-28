import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { SearchOptions } from '@src/types';
import type { PreApprovalPlanResponse } from '../commonTypes';

export declare type Search = {
  filters?: PreApprovalPlanSearchOptions,
  config: MercadoPagoConfig
};

export declare interface PreApprovalPlanSearchOptions extends SearchOptions {
  status?: string;
  q?: string;
  sort?: string;
  criteria?: string;
}

export declare type PreApprovalPlanSearchResponse = {
  paging: PreApprovalPlanSearchPaging;
  results: Array<PreApprovalPlanResponse>;
};

export declare type PreApprovalPlanSearchPaging = {
  total: number;
  limit: number;
  offset: number;
};


