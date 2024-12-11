// API version: 5d077b6f-61b2-4b3a-8333-7a64ee547448

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