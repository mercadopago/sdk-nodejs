import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type ChargebackGetData = {
	id: string;
	requestOptions?: Options;
}

export declare interface ChargebackGetClient extends ChargebackGetData {
	config: MercadoPagoConfig;
} 