// API version: 5d077b6f-61b2-4b3a-8333-7a64ee547448

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import { PaymentRequest } from '../../commonTypes';

export declare type OrderCreateTransactionClient = {
	id: string;
	body: OrderCreateTransactionRequest;
	config: MercadoPagoConfig;
}

export declare type OrderCreateTransactionData = {
	id: string;
	body: OrderCreateTransactionRequest;
	requestOptions?: Options;
}

export declare type OrderCreateTransactionRequest = {
	payments?: PaymentRequest[];
}
