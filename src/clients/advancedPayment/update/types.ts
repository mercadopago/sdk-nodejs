/**
 * Request types for the update advanced-payment operation.
 *
 * @module advancedPayment/update/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type AdvancedPaymentUpdateRequest = Record<string, unknown>;

export declare type AdvancedPaymentUpdateClient = {
  id: string;
  body: AdvancedPaymentUpdateRequest;
  config: MercadoPagoConfig;
};

export declare type AdvancedPaymentUpdateData = {
  id: string;
  body: AdvancedPaymentUpdateRequest;
  requestOptions?: Options;
};
