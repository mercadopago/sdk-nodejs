// API version: b950ae02-4f49-4686-9ad3-7929b21b6495

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type OrderDeleteTransactionClient = {
	id: string;
	transactionId: string;
	config: MercadoPagoConfig;
}

export declare type OrderDeleteTransactionData = {
	id: string;
	transactionId: string;
	requestOptions?: Options;
}
