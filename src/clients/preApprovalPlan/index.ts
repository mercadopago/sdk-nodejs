import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreApprovalPlansGetData } from './get/types';
import type { UpdatePreApprovalPlanUpdateData } from './update/types';
import type { PreApprovalPlanSearchResponse, PreApprovalPlansSearchData } from './search/types';
import type { PreApprovalPlanResponse } from './commonTypes';
import type { PreApprovalPlansCreateData } from './create/types';

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
	create({ body, requestOptions }: PreApprovalPlansCreateData): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/get.ts Usage Example  }.
   */
	get({ preApprovalPlanId, requestOptions }: PreApprovalPlansGetData): Promise<PreApprovalPlanResponse> {
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
	search(preApprovalPlanSearchData: PreApprovalPlansSearchData = {}): Promise<PreApprovalPlanSearchResponse> {
		const { options, requestOptions } = preApprovalPlanSearchData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

}
