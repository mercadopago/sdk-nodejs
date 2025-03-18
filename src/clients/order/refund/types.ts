// API version: 7d364c51-04c7-45e3-af61-f82423bcc39c

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type OrderRefundData = {
	id: string;
	body?: RefundRequest;
	requestOptions?: Options;
}

export declare type OrderRefundClient = {
	config: MercadoPagoConfig;
	id: string;
	body?: RefundRequest;
}

export declare type RefundRequest = {
	transactions?: TransactionRefundRequest[];
}

export declare type TransactionRefundRequest = {
	id?: string;
	amount?: string;
}
