import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalPlanResponse } from '../commonTypes';
import type { Options } from '@src/types';

export declare type PreApprovalPlansSearchClient = {
  filters?: PreApprovalPlanSearchOptions,
  config: MercadoPagoConfig
};

export declare type PreApprovalPlanSearchOptions = {
  status?: string;
  q?: string;
  sort?: string;
  criteria?: string;
  offset?: string;
  limit?: string;
};

export declare type PreApprovalPlanSearchResponse = {
  paging?: PreApprovalPlanSearchPaging;
  results?: Array<PreApprovalPlanResponse>;
};

export declare type PreApprovalPlanSearchPaging = {
  total: number;
  limit: number;
  offset: number;
};

export declare type PreApprovalPlansSearchData = {
  filters?: PreApprovalPlanSearchOptions;
  requestOptions?: Options;
}
