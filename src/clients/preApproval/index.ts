import create from './create';
import get from './get';
import search from './search';
import update from './update';

import type { PreApprovalCreateData } from './create/types';
import type { PreApprovalGetData } from './get/types';
import type { PreApprovalResponse } from './commonTypes';
import type { PreApprovalSearchData, PreApprovalSearchResponse } from './search/types';
import type { PreApprovalUpdateData, PreApprovalUpdateResponse } from './update/types';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
export class PreApproval {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/create.ts Usage Example  }.
   */
	create({ body, requestOptions }: PreApprovalCreateData): Promise<PreApprovalResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/get.ts Usage Example  }.
   */
	get({ id, requestOptions }: PreApprovalGetData): Promise<PreApprovalResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/search.ts Usage Example  }.
   */
	search(preApprovalSearchData: PreApprovalSearchData = {}): Promise<PreApprovalSearchResponse> {
		const { options, requestOptions } =  preApprovalSearchData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/update.ts Usage Example  }.
   */
	update({ id, body, requestOptions }: PreApprovalUpdateData): Promise<PreApprovalUpdateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, body, config: this.config });
	}
}
