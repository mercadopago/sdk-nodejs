import { ApiResponse } from '@src/types';
import { CustomerCardCardholder } from '../commonTypes';

export declare interface CardTokenResponse extends ApiResponse {
  id?: string;
  card_id?: string;
  first_six_digits?: string;
  expiration_month?: number;
  expiration_year?: number;
  last_four_digits?: string;
  cardholder?: CustomerCardCardholder;
  status?: string;
  date_created?: string;
  date_last_updated?: string;
  date_due?: string;
  luhn_validation?: boolean;
  live_mode?: boolean;
  require_esc?: boolean;
  card_number_length?: number;
  security_code_length?: number;
}
