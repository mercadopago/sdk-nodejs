import { MercadoPagoConfig } from "../../../MercadoPagoConfig";
import { Identification } from "../../payments/search/types";

export declare type CardTokenGet = {
  id: string;
  config: MercadoPagoConfig;
};

export declare type CardTokenResponse = {
  id: string;
  card_id: string;
  first_six_digits: string;
  expiration_month: number;
  expiration_year: number;
  last_four_digits: string;
  cardholder: CustomerCardCardholder;
  status: string;
  date_created: string;
  date_last_updated: string;
  date_due: string;
  luhn_validation: boolean;
  live_mode: boolean;
  require_esc: boolean;
  card_number_length: number;
  security_code_length: number;
};

export declare type CustomerCardCardholder = {
  name: string;
  identification: Identification;
};

export declare type CardTokenId = {
  cardTokenId: string;
};




