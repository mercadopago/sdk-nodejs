import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CustomerCreateByEmailData = {
	email: string;
	first_name?: string;
	last_name?: string;
	requestOptions?: Options;
}

export declare type CustomerCreateByEmailClient = {
	email: string;
	first_name?: string;
	last_name?: string;
	config: MercadoPagoConfig;
} 