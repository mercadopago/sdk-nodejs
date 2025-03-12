import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { PaymentMethodRequest } from '../../commonTypes';
import { Options } from '@src/types';


export declare type OrderUpdateTransactionClient = {
	id: string;
	transactionId: string;
	body: PaymentMethodRequest;
	config: MercadoPagoConfig;
}

export declare type OrderUpdateTransactionData = {
	id: string;
	transactionId: string;
	body: PaymentMethodRequest;
	requestOptions?: Options;
}
