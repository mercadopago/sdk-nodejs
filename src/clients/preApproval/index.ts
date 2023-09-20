import create from './create';
import get from './get';
import search from './search';
import update from './update';

import { PreApprovalRequest, PreApprovalResponse } from './commonTypes';
import type { PreApprovalSearchOptions, PreApprovalSearchResponse } from './search/types';
import type { PreApprovalUpdateOptions, PreApprovalUpdateResponse } from './update/types';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

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
	create(body: PreApprovalRequest): Promise<PreApprovalResponse> {
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/get/get.ts Usage Example  }.
   */
	get({ id }): Promise<PreApprovalResponse> {
		return get({ id, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/search/search.ts Usage Example  }.
   */
	search(filters?: PreApprovalSearchOptions): Promise<PreApprovalSearchResponse> {
		return search({ filters, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preApproval/update/update.ts Usage Example  }.
   */
	update({ id, body }: PreApprovalUpdateOptions): Promise<PreApprovalUpdateResponse> {
		return update({ id, body, config: this.config });
	}
}
