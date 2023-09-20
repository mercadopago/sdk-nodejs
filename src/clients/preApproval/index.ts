import create from './create';
import get from './get';
import search from './search';
import update from './update';

import { PreApprovalRequest, PreApprovalResponse } from './commonTypes';
import type { PreApprovalSearchOptions, PreApprovalSearchResponse } from './search/types';
import type { PreApprovalUpdateOptions, PreApprovalUpdateResponse } from './update/types';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export class PreApproval {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/create/create.ts Usage Example  }.
   */
	create(body: PreApprovalRequest, requestOptions?: Options): Promise<PreApprovalResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/get/get.ts Usage Example  }.
   */
	get({ id }, requestOptions?: Options): Promise<PreApprovalResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/search/search.ts Usage Example  }.
   */
	search(filters?: PreApprovalSearchOptions, requestOptions?: Options): Promise<PreApprovalSearchResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ filters, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/update/update.ts Usage Example  }.
   */
	update({ id, body }: PreApprovalUpdateOptions, requestOptions?: Options): Promise<PreApprovalUpdateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, body, config: this.config });
	}
}
