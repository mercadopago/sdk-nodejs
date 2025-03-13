// API version: 1ff4822a-2dfd-4393-800e-a562edb3fe32

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
