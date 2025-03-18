// API version: 7d364c51-04c7-45e3-af61-f82423bcc39c

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
