import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CardTokenGetData = {
	id: string;
	requestOptions?: Options;
}

export declare interface CardTokenGetClient extends CardTokenGetData {
	config: MercadoPagoConfig;
} 