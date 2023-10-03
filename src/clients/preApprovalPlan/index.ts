import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreApprovalPlanGetData } from './get/types';
import type { UpdatePreApprovalPlanUpdateData } from './update/types';
import type { PreApprovalPlanSearchResponse, PreApprovalPlanSearchData } from './search/types';
import type { PreApprovalPlanResponse } from './commonTypes';
import type { PreApprovalPlanCreateData } from './create/types';

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
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/create.ts Usage Example  }.
   */
	create({ body, requestOptions }: PreApprovalPlanCreateData): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/get.ts Usage Example  }.
   */
	get({ preApprovalPlanId, requestOptions }: PreApprovalPlanGetData): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id: preApprovalPlanId, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/update.ts Usage Example  }.
   */
	update({ id, updatePreApprovalPlanRequest, requestOptions }: UpdatePreApprovalPlanUpdateData): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreApprovalPlanRequest, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/search.ts Usage Example  }.
   */
	search(preApprovalPlanSearchData: PreApprovalPlanSearchData = {}): Promise<PreApprovalPlanSearchResponse> {
		const { options, requestOptions } = preApprovalPlanSearchData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

}
