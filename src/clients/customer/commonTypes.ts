/**
 * Shared request and response types for the Customer API client.
 *
 * Defines the body shape used when creating or updating customers, the
 * API response envelope, and the helper types for address and city data.
 *
 * @module clients/customer/commonTypes
 */

import { ApiResponse, Options } from '@src/types';
import type { Identification, Phone } from '../commonTypes';
import type { CustomerCardCreateClient } from '../customerCard/create/types';

/**
 * Request body for creating or updating a customer.
 *
 * All fields are optional so the same type can be used for both full
 * creation and partial update payloads.
 */
export declare type CustomerRequestBody = {
  /** Customer email address (must be unique per MercadoPago application). */
  email?: string;
  /** Customer first name. */
  first_name?: string;
  /** Customer last name. */
  last_name?: string;
  /** Customer phone number. */
  phone?: Phone;
  /** Government-issued identification document. */
  identification?: Identification;
  /** ID of the customer's default address. */
  default_address?: string;
  /** Primary address associated with the customer. */
  address?: CustomerAddressRequest;
  /** ID of the customer's default saved card. */
  default_card?: string;
  /** Date the customer registered on the platform (ISO 8601). */
  date_registered?: string;
  /** Free-text description or notes about the customer. */
  description?: string;
};

/**
 * Address payload sent when creating or updating a customer.
 */
export declare type CustomerAddressRequest = {
  /** Address identifier. */
  id: string;
  /** Postal / ZIP code. */
  zip_code?: string;
  /** Street name. */
  street_name: string;
  /** Street number. */
  street_number: number;
  /** City information for this address. */
  city: CustomerAddressCity;
};

/**
 * City portion of a customer address.
 */
export declare type CustomerAddressCity = {
  /** City name. */
  name?: string;
};

/**
 * API response returned by customer endpoints (create, get, update, remove).
 *
 * Extends {@link ApiResponse} with all customer-domain fields returned by
 * the MercadoPago `/v1/customers` resource.
 */
export declare interface CustomerResponse extends ApiResponse {
  /** Unique customer identifier assigned by MercadoPago. */
  id?: string;
  /** Customer email address. */
  email?: string;
  /** Customer first name. */
  first_name?: string;
  /** Customer last name. */
  last_name?: string;
  /** Customer phone number. */
  phone?: Phone;
  /** Government-issued identification document. */
  identification?: Identification;
  /** ID of the customer's default address. */
  default_address?: string;
  /** Primary address on file. */
  address?: CustomerDefaultAddress;
  /** Date the customer registered on the platform (ISO 8601). */
  date_registered?: string;
  /** Free-text description or notes about the customer. */
  description?: string;
  /** Timestamp when the customer record was created (ISO 8601). */
  date_created?: string;
  /** Timestamp of the last update to the customer record (ISO 8601). */
  date_last_updated?: string;
  /** Arbitrary key-value metadata attached to the customer. */
  metadata?: any;
  /** ID of the customer's default saved card. */
  default_card?: string;
  /** Saved payment cards associated with this customer. */
  cards?: CustomerCardCreateClient[];
  /** Addresses on file for this customer. */
  addresses?: CustomerDefaultAddress[];
  /** Whether this customer was created in live (production) mode. */
  live_mode?: boolean;
}

/**
 * Simplified address returned inside customer responses.
 */
export declare type CustomerDefaultAddress = {
  /** Address identifier. */
  id?: string;
  /** Postal / ZIP code. */
  zip_code?: string;
  /** Street name. */
  street_name?: string;
  /** Street number (returned as string). */
  street_number?: string;
};

/**
 * Input data for retrieving or removing a customer by ID.
 */
export declare type CustomerGetRemoveData = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
}
