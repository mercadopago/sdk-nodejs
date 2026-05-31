/**
 * Request types for the cancel advanced-payment operation.
 *
 * @module advancedPayment/cancel/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type AdvancedPaymentCancelClient = {
  id: string;
  config: MercadoPagoConfig;
};

export declare type AdvancedPaymentCancelData = {
  id: string;
  requestOptions?: Options;
};
