import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type OrderProcessData = {
	id: string;
	requestOptions?: Options;
}

export declare type OrderProcessClient = {
	config: MercadoPagoConfig;
	id: string;
}
