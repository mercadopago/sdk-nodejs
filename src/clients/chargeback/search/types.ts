import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, SearchOptions } from '@src/types';
import type { ChargebackResponse } from '../commonTypes';

export declare type ChargebackSearchClient = {
	options?: ChargebackSearchOptions,
	config: MercadoPagoConfig
};

export declare type ChargebackSearch = {
	paging?: ChargebackSearchPaging;
	results?: Array<ChargebackResponse>;
};

export declare type ChargebackSearchPaging = {
	total: number;
	limit: number;
	offset: number;
};

export declare interface ChargebackSearchOptions extends SearchOptions {
	sort?: 'date_created' | 'date_last_updated';
	criteria?: 'asc' | 'desc';
	external_reference?: string;
	payment_id?: string;
	range?: 'date_created' | 'date_last_updated';
	begin_date?: string;
	end_date?: string;
}

export declare type ChargebackSearchData = {
	options?: ChargebackSearchOptions;
	requestOptions?: Options;
} 