// API version: 5d077b6f-61b2-4b3a-8333-7a64ee547448

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CreateOrderTransactionClient = {
	id: string;
	body: CreateOrderTransactionRequest;
	config: MercadoPagoConfig;
}

export declare type CreateOrderTransactionData = {
	id: string;
	body: CreateOrderTransactionRequest;
	requestOptions?: Options;
}

export declare type CreateOrderTransactionRequest = {
	payments?: PaymentRequest[];
}

export declare type PaymentRequest = {
	amount?: string;
	payment_method?: PaymentMethodRequest;
}

export declare type PaymentMethodRequest = {
	id?: string;
	type?: string;
	token?: string;
	installments?: number;
}
