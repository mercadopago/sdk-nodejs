import list from './list';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { IdentificationTypeResponse } from './list/types';
import type { Options } from '@src/types';

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
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/identificationtypes/list.ts Usage Example  }.
   */
	list(requestOptions?: Options): Promise<IdentificationTypeResponse[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return list({ config: this.config });
	}
}
