import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';

export declare type CardTokenCreateClient = {
	body: CardTokenCreateBody;
	config: MercadoPagoConfig;
};

export declare type CardTokenCreateBody = {
	card_id?: string;
	card_number?: string;
	customer_id?: string;
	expiration_month?: string;
	expiration_year?: string;
	security_code?: string;
};

export declare type CardTokenCreateData = {
	body: CardTokenCreateBody;
	requestOptions?: Options;
};
