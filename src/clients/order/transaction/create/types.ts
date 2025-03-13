// API version: 1ff4822a-2dfd-4393-800e-a562edb3fe32

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
