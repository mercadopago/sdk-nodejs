import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SearchOptions } from '@src/types';
import type { PreApprovalPlanResponse } from '../commonTypes';
import type { Options } from '@src/types';

export declare type PreApprovalPlanSearchClient = {
  options?: PreApprovalPlanSearchOptions,
  config: MercadoPagoConfig
};

export declare interface PreApprovalPlanSearchOptions extends SearchOptions {
  status?: string;
  q?: string;
  sort?: string;
  criteria?: string;
}

export declare type PreApprovalPlanSearchResponse = {
  paging?: PreApprovalPlanSearchPaging;
  results?: Array<PreApprovalPlanResponse>;
};

export declare type PreApprovalPlanSearchPaging = {
  total: number;
  limit: number;
  offset: number;
};

export declare type PreApprovalPlanSearchData = {
  options?: PreApprovalPlanSearchOptions;
  requestOptions?: Options;
}
