import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreferenceId, GetPreferenceResponse } from './get/types';
import type { PreferenceRequest, PreferenceResponse } from './create/types';
import type { UpdatePreferenceRequest, UpdatePreferenceResponse } from './update/types';
import type { PreferenceSearchOptions, PreferenceSearchResponse } from './search/types';


/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference Documentation }.
 */

export class Preference {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/src/preferences/get/get.ts Usage Example  }.
 */
	get({ preferenceId }: PreferenceId): Promise<GetPreferenceResponse> {
		return get({ id: preferenceId, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/src/preferences/create/create.ts Usage Example  }.
 */
	create(preferenceRequest: PreferenceRequest): Promise<PreferenceResponse> {
		return create({ preferenceRequest, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/src/preferences/update/update.ts Usage Example  }.
 */
	update({ id, updatePreferenceRequest }: UpdatePreferenceRequest): Promise<UpdatePreferenceResponse> {
		return update({ id, updatePreferenceRequest, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/src/preferences/search/search.ts Usage Example  }.
 */
	search(filters?: PreferenceSearchOptions): Promise<PreferenceSearchResponse> {
		return search({ filters, config: this.config });
	}

}
