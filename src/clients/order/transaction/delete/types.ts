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
