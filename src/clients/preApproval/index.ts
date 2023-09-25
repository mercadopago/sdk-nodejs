import create from './create';
import get from './get';
import search from './search';
import update from './update';

import type { PreApprovalCreateRequest } from './create/types';
import type { PreApprovalGetRequest } from './get/types';
import type { PreApprovalResponse } from './commonTypes';
import type { PreApprovalSearchRequest, PreApprovalSearchResponse } from './search/types';
import type { PreApprovalUpdateRequest, PreApprovalUpdateResponse } from './update/types';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
export class PreApproval {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/create.ts Usage Example  }.
   */
	create({ body, requestOptions }: PreApprovalCreateRequest): Promise<PreApprovalResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/get.ts Usage Example  }.
   */
	get({ id, requestOptions }: PreApprovalGetRequest): Promise<PreApprovalResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/search.ts Usage Example  }.
   */
	search({ filters, requestOptions }: PreApprovalSearchRequest): Promise<PreApprovalSearchResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ filters, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/update.ts Usage Example  }.
   */
	update({ id, body, requestOptions }: PreApprovalUpdateRequest): Promise<PreApprovalUpdateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, body, config: this.config });
	}
}
