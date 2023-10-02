import { ApiResponse, Options } from '@src/types';
import type { Identification, Phone } from '../commonTypes';
import type { CustomerCardCreateClient } from '../customerCard/create/types';

export declare type CustomerRequestBody = {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: Phone;
  identification?: Identification;
  default_address?: string;
  address?: CustomerAddressRequest;
  default_card?: string;
  date_registered?: string;
  description?: string;
};

export declare type CustomerAddressRequest = {
  id: string;
  zip_code?: string;
  street_name: string;
  street_number: number;
  city: CustomerAddressCity;
};

export declare type CustomerAddressCity = {
  name?: string;
};

export declare interface CustomerResponse extends ApiResponse {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: Phone;
  identification?: Identification;
  default_address?: string;
  address?: CustomerDefaultAddress;
  date_registered?: string;
  description?: string;
  date_created?: string;
  date_last_updated?: string;
  metadata?: any;
  default_card?: string;
  cards?: CustomerCardCreateClient[];
  addresses?: CustomerDefaultAddress[];
  live_mode?: boolean;
}

export declare type CustomerDefaultAddress = {
  id?: string;
  zip_code?: string;
  street_name?: string;
  street_number?: string;
};

export declare type CustomerGetRemoveData = {
  customerId: string;
  requestOptions?: Options;
}
