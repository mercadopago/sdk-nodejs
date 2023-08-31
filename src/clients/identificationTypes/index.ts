import get from './get';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { IdentificationTypeResponse } from './get/types';

/**
 * Mercado Pago IdentificationTypes.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get Documentation }.
 */
export class IdentificationType {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Identification Types get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/src/identificationtypes/get.ts Usage Example  }.
   */
	get(): Promise<IdentificationTypeResponse[]> {
		return get({ config: this.config });
	}
}
