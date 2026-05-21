import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import { OrderResponse } from '../commonTypes';

export declare type OrderSearchData = {
	options?: OrderSearchRequest;
	requestOptions?: Options;
}

export declare type OrderSearchClient = {
	config: MercadoPagoConfig;
	options?: OrderSearchRequest;
}

export declare type OrderSearchRequest = {
	begin_date: string;
	end_date: string;
	external_reference?: string;
	type?: string;
	status?: string;
	status_detail?: string;
	payment_method_id?: string;
	payment_method_type?: string;
	page?: number;
	page_size?: number;
	sort_by?: string;
	sort_order?: string;
}

export declare type OrderSearchResponse = {
	data?: OrderResponse[];
	paging?: PagingResponse;
}

export declare type PagingResponse = {
	total?: string;
	total_pages?: string;
	offset?: string;
	limit?: string;
}
