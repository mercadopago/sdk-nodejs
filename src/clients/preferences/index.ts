import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreferenceId } from './get/types';
import type { UpdatePreferenceRequest } from './update/types';
import type { PreferenceSearchOptions, PreferenceSearchResponse } from './search/types';
import type { PreferenceRequest, PreferenceResponse } from './commonTypes';
import type { Options } from '@src/types';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class Preference {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preferences/get/get.ts Usage Example  }.
   */
	get({ preferenceId }: PreferenceId, requestOptions?: Options): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id: preferenceId, config: this.config });
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preferences/create/create.ts Usage Example  }.
   */
	create(preferenceRequest: PreferenceRequest, requestOptions?: Options): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ preferenceRequest, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preferences/update/update.ts Usage Example  }.
   */
	update({ id, updatePreferenceRequest }: UpdatePreferenceRequest, requestOptions?: Options): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreferenceRequest, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preferences/search/search.ts Usage Example  }.
   */
	search(filters?: PreferenceSearchOptions, requestOptions?: Options): Promise<PreferenceSearchResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ filters, config: this.config });
	}

}
