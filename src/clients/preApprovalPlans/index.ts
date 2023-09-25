import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreApprovalPlanId } from './get/types';
import type { UpdatePreApprovalPlanRequest } from './update/types';
import type { PreApprovalPlanSearchOptions, PreApprovalPlanSearchResponse } from './search/types';
import type { PreApprovalPlanRequest, PreApprovalPlanResponse } from './commonTypes';
import type { Options } from '@src/types';

/**
 * Mercado Pago PreApprovalPlan.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class PreApprovalPlan {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/create/create.ts Usage Example  }.
   */
	create(preApprovalPlanRequest: PreApprovalPlanRequest, requestOptions?: Options): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ preApprovalPlanRequest, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/get/get.ts Usage Example  }.
   */
	get({ preApprovalPlanId }: PreApprovalPlanId, requestOptions?: Options): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id: preApprovalPlanId, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/update/update.ts Usage Example  }.
   */
	update({ id, updatePreApprovalPlanRequest }: UpdatePreApprovalPlanRequest, requestOptions?: Options): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreApprovalPlanRequest, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/search/search.ts Usage Example  }.
   */
	search(filters?: PreApprovalPlanSearchOptions, requestOptions?: Options): Promise<PreApprovalPlanSearchResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ filters, config: this.config });
	}

}
