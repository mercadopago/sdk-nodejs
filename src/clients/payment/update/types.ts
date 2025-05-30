import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentUpdateRequestBody = {
	status?: string;
	status_detail?: string;
	transaction_amount?: number;
	description?: string;
	external_reference?: string;
	metadata?: Record<string, unknown>;
}

export declare type PaymentUpdateData = {
	id: string | number;
	body: PaymentUpdateRequestBody;
	requestOptions?: Options;
}

export declare interface PaymentUpdateClient extends PaymentUpdateData {
	config: MercadoPagoConfig;
} 