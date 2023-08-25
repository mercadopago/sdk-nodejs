import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Identification } from '@src/clients/commonTypes';

export declare type CustomerCard = {
  customerId: string;
  body: CustomerCardBody;
  config: MercadoPagoConfig;
};

export declare type CustomerCardBody = {
  token: string;
};

export declare type CustomerCardResponse = {
  id: string;
  customer_id: string;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  last_four_digits: string;
  payment_method: CustomerCardPaymentMethod;
  security_code: CustomerCardSecurityCode;
  issuer: CustomerCardIssuer;
  cardholder: CustomerCardCardholder;
  date_created: string;
  date_last_updated: string;
  user_id: string;
  live_mode: boolean;
};

export declare class CustomerCardPaymentMethod {
	id: string;
	name: string;
	payment_type_id: string;
	thumbnail: string;
	secure_thumbnail: string;
}

export declare class CustomerCardSecurityCode {
	length: number;
	card_location: string;
}

export declare class CustomerCardIssuer {
	readonly id: string;
	readonly name: string;
}

export declare class CustomerCardCardholder {
	name: string;
	identification: Identification;
}
export declare type CustomerCardCreate = {
  customerId: string;
  customerCardBody: CustomerCardBody;
};



