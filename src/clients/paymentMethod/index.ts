/**
 * Payment Method client for the MercadoPago API.
 *
 * Provides a method to retrieve the list of payment methods available
 * for the authenticated account's country/site, including card brands,
 * bank transfers, and off-line payment options.
 *
 * @module paymentMethod
 */

import get from './get';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentMethodResponse } from './get/types';
import type { Options } from '@src/types';

/**
 * Client facade for querying available MercadoPago payment methods.
 *
 * Use this class to discover which payment methods (credit cards, debit
 * cards, bank transfers, tickets, etc.) are accepted for the seller's
 * site and country.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class PaymentMethod {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Retrieve all payment methods available for the authenticated account.
	 *
	 * Returns an array of payment methods with their settings, amount
	 * constraints, and processing modes.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/paymentmethod/get.ts Usage Example }.
	 */
	get(paymentMethodsGetOptions: {requestOptions?: Options;} = {}): Promise<PaymentMethodResponse[]> {
		const { requestOptions } =  paymentMethodsGetOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ config: this.config });
	}
}
