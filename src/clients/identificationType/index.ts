/**
 * Identification Type client for the MercadoPago API.
 *
 * Provides a method to list the accepted identification document types
 * (e.g. CPF, DNI, CURP) for the seller's country, which are required
 * when collecting payer or cardholder information.
 *
 * @module identificationType
 */

import list from './list';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { IdentificationTypeResponse, IdentificationTypeListData } from './list/types';

/**
 * Client facade for querying accepted identification document types.
 *
 * Each MercadoPago country/site accepts a specific set of ID document
 * types. Use this class to retrieve them so you can present the correct
 * options to the buyer during checkout.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get Documentation }.
 */
export class IdentificationType {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * List all accepted identification document types for the account's country.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/identificationtype/list.ts Usage Example }.
	 */
	list(identificationTypeListOptions: IdentificationTypeListData = {} as IdentificationTypeListData): Promise<IdentificationTypeResponse[]> {
		const { requestOptions } =  identificationTypeListOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return list({ config: this.config });
	}
}
